import {
	Col,
	DataTableComponent,
	PanelTabs,
	ProfileComponent,
	ProfileSquaredComponent,
	Row,
	TableActions,
	TagComponent
	} from "@common-components";
import { imagesTable, text } from "@core";
import {
	Appointment,
	genderToString,
	Patient,
	PatientAppointmentsPanel,
	PatientGalleryPanel,
	PrescriptionItem,
	StaffMember
	} from "@modules";
import { formatDate } from "@utils";
import { computed, observable } from "mobx";
import { observer } from "mobx-react";
import {
	Icon,
	IconButton,
	Panel,
	PanelType,
	PersonaInitialsColor,
	Shimmer
	} from "office-ui-fabric-react";
import { MessageBar, MessageBarType, PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";
import * as loadable from "react-loadable";

const PatientDetailsPanel = loadable({
	loader: async () =>
		(await import("modules/patients/components/patient-details"))
			.PatientDetailsPanel,
	loading: () => <Shimmer />
});
const DentalHistoryPanel = loadable({
	loader: async () =>
		(await import("modules/patients/components/dental-history"))
			.DentalHistoryPanel,
	loading: () => <Shimmer />
});

const AppointmentEditorPanel = loadable({
	loader: async () =>
		(await import("modules/appointments/components/appointment-editor"))
			.AppointmentEditorPanel,
	loading: () => <Shimmer />
});

@observer
export class PatientsPage extends React.Component<{
	patients: Patient[];
	currentUser: StaffMember;
	dateFormat: string;
	currencySymbol: string;
	currentLocation: string;
	onDeletePatient: (id: string) => void;
	onAddPatient: (patient: Patient) => void;
	onAddAppointment: (appointment: Appointment) => void;
	saveFile: (obj: {
		blob: Blob;
		ext: string;
		dir: string;
	}) => Promise<string>;
	getFile: (path: string) => Promise<string>;
	removeFile: (path: string) => Promise<any>;
	onDeleteAppointment: (id: string) => void;
	doDeleteAppointment: (id: string) => void;
	availableTreatments: { _id: string; expenses: number; type: string }[];
	availablePrescriptions: PrescriptionItem[];
	appointmentsForDay: (
		year: number,
		month: number,
		day: number,
		filter?: string | undefined,
		operatorID?: string | undefined
	) => Appointment[];
	prescriptionsEnabled: boolean;
	timeTrackingEnabled: boolean;
	operatingStaff: { _id: string; name: string; onDutyDays: string[] }[];
	doDeletePatient: (id: string) => void;
	allAppointments: Appointment[];
}> {
	tabs = [
		{
			key: "details",
			title: "Patient Details",
			icon: "DietPlanNotebook"
		},
		{
			key: "dental",
			title: "Dental History",
			icon: "teeth"
		},
		{
			key: "gallery",
			title: "Gallery and X-Rays",
			icon: "PhotoCollection"
		},
		{
			key: "appointments",
			title: "Appointments",
			icon: "Calendar",
			hidden: !this.props.currentUser.canViewAppointments
		},
		{
			key: "delete",
			title: "Delete",
			icon: "Trash",
			hidden: !this.canEdit,
			hiddenOnPanel: true
		}
	];

	@observable selectedAppointmentId = "";
	@observable selectedId: string = this.props.currentLocation.split("/")[1];

	@observable viewWhich: string = this.props.currentLocation.split("/")[1]
		? "details"
		: "";

	@computed
	get patient() {
		return this.props.patients.find(
			patient => patient._id === this.selectedId
		);
	}

	@computed get canEdit() {
		return this.props.currentUser.canEditPatients;
	}

	@computed get selectedAppointment() {
		return this.props.allAppointments.find(
			x => x._id === this.selectedAppointmentId
		);
	}

	render() {
		return (
			<div className="patients-component">
				{this.patient ? (
					<Panel
						key={this.selectedId}
						isOpen={!!this.patient}
						type={PanelType.medium}
						closeButtonAriaLabel="Close"
						isLightDismiss={true}
						onDismiss={() => {
							this.selectedId = "";
							this.viewWhich = "";
						}}
						onRenderNavigation={() => {
							return (
								<div className="panel-heading">
									<Row>
										<Col span={22}>
											<ProfileComponent
												name={this.patient!.name}
												size={2}
												avatar={
													this.patient!.avatar
														? imagesTable.table[
																this.patient!
																	.avatar
														  ]
															? imagesTable.table[
																	this
																		.patient!
																		.avatar
															  ]
															: imagesTable.fetchImage(
																	this
																		.patient!
																		.avatar
															  )
														: undefined
												}
											/>
										</Col>
										<Col span={2} className="close">
											<IconButton
												data-testid="close-panel"
												iconProps={{
													iconName: "cancel"
												}}
												onClick={() => {
													this.selectedId = "";
													this.viewWhich = "";
												}}
											/>
										</Col>
									</Row>
									<PanelTabs
										currentSelectedKey={this.viewWhich}
										onSelect={key => {
											this.viewWhich = key as any;
										}}
										items={this.tabs}
									/>
								</div>
							);
						}}
					>
						{this.viewWhich === "details" ? (
							<PatientDetailsPanel
								patient={this.patient!}
								currentUser={this.props.currentUser}
								usedLabels={this.props.patients
									.map(x => x.labels)
									.reduce(
										(a: string[], b) =>
											a.concat(b.map(x => x.text)),
										[]
									)}
								onChangeViewWhich={key =>
									(this.viewWhich = key)
								}
							/>
						) : (
							""
						)}
						{this.viewWhich === "dental" ? (
							<DentalHistoryPanel
								patient={this.patient!}
								currentUser={this.props.currentUser}
							/>
						) : (
							""
						)}
						{this.viewWhich === "gallery" ? (
							<PatientGalleryPanel
								patient={this.patient}
								currentUser={this.props.currentUser}
								saveFile={obj => this.props.saveFile(obj)}
								getFile={path => this.props.getFile(path)}
								removeFile={path => this.props.removeFile(path)}
							/>
						) : (
							""
						)}
						{this.viewWhich === "appointments" ? (
							<PatientAppointmentsPanel
								patient={this.patient}
								currentUser={this.props.currentUser}
								appointments={this.patient.appointments}
								onAdd={appointment =>
									this.props.onAddAppointment(appointment)
								}
								dateFormat={this.props.dateFormat}
								onDeleteAppointment={id =>
									this.props.onDeleteAppointment(id)
								}
								doDeleteAppointment={id =>
									this.props.doDeleteAppointment(id)
								}
								availablePrescriptions={
									this.props.availablePrescriptions
								}
								availableTreatments={
									this.props.availableTreatments
								}
								currencySymbol={this.props.currencySymbol}
								prescriptionsEnabled={
									this.props.prescriptionsEnabled
								}
								timeTrackingEnabled={
									this.props.timeTrackingEnabled
								}
								operatingStaff={this.props.operatingStaff}
								appointmentsForDay={(a, b, c) =>
									this.props.appointmentsForDay(a, b, c)
								}
							/>
						) : (
							""
						)}

						{this.viewWhich === "delete" ? (
							<div>
								<br />
								<MessageBar
									messageBarType={MessageBarType.warning}
								>
									{`${text("All of the patient")} ${
										this.patient.name
									}${text(
										"'s data will be deleted along with"
									)} ${
										this.patient.appointments.length
									} ${text("of appointments")}.`}
								</MessageBar>
								<br />
								<PrimaryButton
									className="delete"
									iconProps={{
										iconName: "delete"
									}}
									text={text("Delete")}
									onClick={() => {
										this.props.doDeletePatient(
											this.selectedId
										);

										this.selectedId = "";
										this.viewWhich = "";
									}}
								/>
							</div>
						) : (
							""
						)}
					</Panel>
				) : (
					""
				)}
				<DataTableComponent
					maxItemsOnLoad={10}
					className={"patients-data-table"}
					heads={[
						text("Patient"),
						text("Last/Next Appointment"),
						text("Total/Outstanding Payments"),
						text("Label")
					]}
					rows={this.props.patients.map(patient => ({
						id: patient._id,
						searchableString: patient.searchableString,
						cells: [
							{
								dataValue:
									patient.name +
									" " +
									patient.age +
									" " +
									genderToString(patient.gender),
								component: (
									<div>
										<ProfileComponent
											name={patient.name}
											avatar={
												patient.avatar
													? imagesTable.table[
															patient.avatar
													  ]
														? imagesTable.table[
																patient.avatar
														  ]
														: imagesTable.fetchImage(
																patient.avatar
														  )
													: undefined
											}
											secondaryElement={
												<span>
													{text(
														genderToString(
															patient.gender
														)
													)}{" "}
													- {patient.age}{" "}
													{text("years old")}
												</span>
											}
											size={3}
										/>
										<br />

										<TableActions
											items={this.tabs}
											onSelect={key => {
												if (key === "delete") {
													this.props.onDeletePatient(
														patient._id
													);
												} else {
													this.selectedId =
														patient._id;
													this.viewWhich = key as any;
												}
											}}
										/>
									</div>
								),
								className: "no-label",
								onClick: () => {
									this.selectedId = patient._id;
									this.viewWhich = "details";
								}
							},
							{
								dataValue: (
									patient.lastAppointment ||
									patient.nextAppointment || { date: 0 }
								).date,
								component: (
									<div>
										<ProfileSquaredComponent
											text={
												patient.lastAppointment
													? patient.lastAppointment
															.treatment
														? patient
																.lastAppointment
																.treatment.type
														: ""
													: ""
											}
											subText={
												patient.lastAppointment
													? formatDate(
															patient
																.lastAppointment
																.date,
															this.props
																.dateFormat
													  )
													: text(
															"No last appointment"
													  )
											}
											size={3}
											onClick={
												patient.lastAppointment
													? () => {
															this.selectedAppointmentId =
																patient.lastAppointment._id;
													  }
													: undefined
											}
											onRenderInitials={() => (
												<Icon iconName="Previous" />
											)}
											initialsColor={
												patient.lastAppointment
													? undefined
													: PersonaInitialsColor.transparent
											}
										/>
										<br />
										<ProfileSquaredComponent
											text={
												patient.nextAppointment
													? patient.nextAppointment
															.treatment
														? patient
																.nextAppointment
																.treatment.type
														: ""
													: ""
											}
											subText={
												patient.nextAppointment
													? formatDate(
															patient
																.nextAppointment
																.date,
															this.props
																.dateFormat
													  )
													: text(
															"No next appointment"
													  )
											}
											size={3}
											onRenderInitials={() => (
												<Icon iconName="Next" />
											)}
											onClick={
												patient.nextAppointment
													? () => {
															this.selectedAppointmentId =
																patient.nextAppointment._id;
													  }
													: undefined
											}
											initialsColor={
												patient.nextAppointment
													? undefined
													: PersonaInitialsColor.transparent
											}
										/>
									</div>
								),
								className: "hidden-xs"
							},
							{
								dataValue: patient.totalPayments,
								component: (
									<div>
										<ProfileSquaredComponent
											text={
												this.props.currencySymbol +
												patient.totalPayments.toString()
											}
											subText={text("Payments made")}
											size={3}
											onRenderInitials={() => (
												<Icon iconName="CheckMark" />
											)}
											initialsColor={
												patient.totalPayments > 0
													? PersonaInitialsColor.darkBlue
													: PersonaInitialsColor.transparent
											}
										/>
										<br />
										<ProfileSquaredComponent
											text={
												this.props.currencySymbol +
												(patient.differenceAmount < 0
													? patient.outstandingAmount.toString()
													: patient.differenceAmount >
													  0
													? patient.overpaidAmount.toString()
													: "0")
											}
											subText={
												patient.differenceAmount < 0
													? text("Outstanding amount")
													: patient.differenceAmount >
													  0
													? text("Overpaid amount")
													: text(
															"No outstanding amount"
													  )
											}
											size={3}
											onRenderInitials={() => (
												<Icon iconName="Cancel" />
											)}
											initialsColor={
												patient.differenceAmount !== 0
													? PersonaInitialsColor.darkRed
													: PersonaInitialsColor.transparent
											}
										/>
									</div>
								),
								className: "hidden-xs"
							},
							{
								dataValue: patient.labels
									.map(x => x.text)
									.join(","),
								component: (
									<div>
										{patient.labels.map((label, index) => {
											return (
												<TagComponent
													key={index}
													text={label.text}
													type={label.type}
												/>
											);
										})}
									</div>
								),
								className: "hidden-xs"
							}
						]
					}))}
					commands={
						this.canEdit
							? [
									{
										key: "addNew",
										title: "Add new",
										name: text("Add new"),
										onClick: () => {
											const patient = new Patient();
											this.props.onAddPatient(patient);
											this.selectedId = patient._id;
											this.viewWhich = "details";
										},
										iconProps: {
											iconName: "Add"
										}
									}
							  ]
							: []
					}
				/>
				{this.selectedAppointment ? (
					<AppointmentEditorPanel
						appointment={this.selectedAppointment}
						onDismiss={() => (this.selectedAppointmentId = "")}
						doDeleteAppointment={id => {
							this.props.doDeleteAppointment(id);
							this.selectedAppointmentId = "";
						}}
						availableTreatments={this.props.availableTreatments}
						availablePrescriptions={
							this.props.availablePrescriptions
						}
						currentUser={this.props.currentUser}
						dateFormat={this.props.dateFormat}
						currencySymbol={this.props.currencySymbol}
						prescriptionsEnabled={this.props.prescriptionsEnabled}
						timeTrackingEnabled={this.props.timeTrackingEnabled}
						operatingStaff={this.props.operatingStaff}
						appointmentsForDay={(year, month, day) =>
							this.props.appointmentsForDay(year, month, day)
						}
					/>
				) : (
					""
				)}
			</div>
		);
	}
}
