import { Col, ProfileSquaredComponent, Row } from "@common-components";
import * as core from "@core";
import { text } from "@core";
import { Calendar, calendar } from "@modules";
import { PatientLinkComponent } from "@modules";
import * as modules from "@modules";
import { dateNames, firstDayOfTheWeekDayPicker, formatDate } from "@utils";
import { computed, observable } from "mobx";
import { observer } from "mobx-react";
import {
	Calendar as MSCal,
	CommandBar,
	DatePicker,
	DateRangeType,
	Icon,
	IconButton,
	Shimmer,
	Toggle
	} from "office-ui-fabric-react";
import * as React from "react";
import * as loadable from "react-loadable";

const AppointmentEditorPanel = loadable({
	loader: async () =>
		(await import("modules/appointments/components/appointment-editor"))
			.AppointmentEditorPanel,
	loading: () => <Shimmer />
});

@observer
export class CalendarPage extends React.Component {
	readonly criticalWidth = 500;
	@observable filter: string = "";

	@computed get appointment() {
		return modules.appointments!.docs.find(
			a => a._id === core.router.selectedID
		);
	}

	@computed get selectedAppointments() {
		return this.c.selectedWeek.map(day => {
			return modules.appointments!.appointmentsForDay(
				day.yearNum,
				day.monthNum + 1,
				day.dateNum,
				this.filter,
				this.showAll ? undefined : core.user.currentUser!._id
			);
		});
	}

	@computed get noAppointmentsThisWeek() {
		return !this.selectedAppointments.find(x => x.length > 0);
	}

	@observable showAll: boolean = true;

	@observable c: Calendar = calendar;

	@observable collapsedMobileCalendar: boolean = false;

	componentDidMount() {
		this.unifyHeight();
	}

	componentDidUpdate() {
		this.unifyHeight();
	}

	unifyHeight() {
		if (!(core.router.innerWidth > this.criticalWidth)) {
			return;
		}
		const parent = document.getElementById("full-day-cols");
		if (!parent) {
			return;
		}
		const els = document.getElementsByClassName(
			"full-day-col"
		) as HTMLCollectionOf<HTMLDivElement>;
		let largest = 0;
		for (let index = 0; index < els.length; index++) {
			const height = els[index].clientHeight;
			if (height > largest) {
				largest = height;
			}
		}
		for (let index = 0; index < els.length; index++) {
			els[index].style.minHeight = largest ? largest + "px" : "auto";
		}
	}

	nextWeekBTN = () => {
		return (
			<IconButton
				iconProps={{ iconName: "Next" }}
				onClick={() => {
					const target = this.c.weeksCalendar[
						this.c.selectedWeekIndex + 1
					];
					if (target) {
						this.c.selected.year = target[0].yearNum;
						this.c.selected.month = target[0].monthNum;
						this.c.selected.day = target[0].dateNum;
					} else {
						this.c.selected.year = this.c.selected.year + 1;
						this.c.selected.month = this.c.weeksCalendar[0][
							this.c.weeksCalendar[0].length - 1
						].monthNum;
						this.c.selected.day = this.c.weeksCalendar[0][
							this.c.weeksCalendar[0].length - 1
						].dateNum;
					}
				}}
			></IconButton>
		);
	};

	prevWeekBTN = () => {
		return (
			<IconButton
				onClick={() => {
					const target = this.c.weeksCalendar[
						this.c.selectedWeekIndex - 1
					];
					if (target) {
						this.c.selected.year = target[0].yearNum;
						this.c.selected.month = target[0].monthNum;
						this.c.selected.day = target[0].dateNum;
					} else {
						this.c.selected.year = this.c.selected.year - 1;
						this.c.selected.month = this.c.weeksCalendar[
							this.c.weeksCalendar.length - 1
						][0].monthNum;
						this.c.selected.day = this.c.weeksCalendar[
							this.c.weeksCalendar.length - 1
						][0].dateNum;
					}
				}}
				iconProps={{ iconName: "Previous" }}
			></IconButton>
		);
	};

	render() {
		return (
			<div className="calendar-component">
				{core.router.innerWidth > this.criticalWidth ? (
					<CommandBar
						{...{
							className: "commandBar fixed",
							isSearchBoxVisible: true,
							elipisisAriaLabel: core.text("More options"),
							farItems: [
								{
									key: "my-appointments-only",
									onRender: () => (
										<Toggle
											checked={this.showAll}
											onText={text("All appointments")}
											offText={text(
												"My appointments only"
											)}
											onChange={(ev, newValue) => {
												this.showAll = newValue!;
											}}
											className="appointments-toggle"
										/>
									)
								}
							],
							items: [
								{
									key: "prev-week",
									onRender: () => (
										<this.prevWeekBTN></this.prevWeekBTN>
									)
								},

								{
									key: "date-selector",
									onRender: () => (
										<DatePicker
											onSelectDate={date => {
												if (date) {
													this.c.selected.year = date.getFullYear();
													this.c.selected.month = date.getMonth();
													this.c.selected.day = date.getDate();
												}
											}}
											formatDate={() => {
												return `${formatDate(
													new Date(
														this.c.selectedWeek[0].yearNum,
														this.c.selectedWeek[0].monthNum,
														this.c.selectedWeek[0].dateNum
													),
													modules.setting!.getSetting(
														"date_format"
													)
												)} — ${formatDate(
													new Date(
														this.c.selectedWeek[
															this.c.selectedWeek
																.length - 1
														].yearNum,
														this.c.selectedWeek[
															this.c.selectedWeek
																.length - 1
														].monthNum,
														this.c.selectedWeek[
															this.c.selectedWeek
																.length - 1
														].dateNum
													),
													modules.setting!.getSetting(
														"date_format"
													)
												)}`;
											}}
											value={
												new Date(
													this.c.selected.year,
													this.c.selected.month,
													this.c.selected.day
												)
											}
											firstDayOfWeek={firstDayOfTheWeekDayPicker(
												modules.setting!.getSetting(
													"weekend_num"
												)
											)}
											calendarProps={{
												dateRangeType:
													DateRangeType.Week,
												strings: {
													months: dateNames.months(),
													shortMonths: dateNames.monthsShort(),
													days: [
														"Sunday",
														"Monday",
														"Tuesday",
														"Wednesday",
														"Thursday",
														"Friday",
														"Saturday"
													],
													shortDays: [
														"Su",
														"Mo",
														"Tu",
														"We",
														"Th",
														"Fr",
														"Sa"
													],
													goToToday: "Go to today"
												},
												autoNavigateOnSelection: true
											}}
											isMonthPickerVisible={true}
											showGoToToday={true}
										/>
									)
								},
								{
									key: "next-week",
									onRender: () => (
										<this.nextWeekBTN></this.nextWeekBTN>
									)
								}
							]
						}}
					/>
				) : (
					<div
						className={`mobile-calendar${
							this.collapsedMobileCalendar ? " collapsed" : ""
						}`}
					>
						<MSCal
							onSelectDate={date => {
								this.c.selected.year = date.getFullYear();
								this.c.selected.month = date.getMonth();
								this.c.selected.day = date.getDate();
							}}
							value={
								new Date(
									this.c.selected.year,
									this.c.selected.month,
									this.c.selected.day
								)
							}
							strings={{
								months: dateNames.months(),
								shortMonths: dateNames.monthsShort(),
								days: [
									"Sunday",
									"Monday",
									"Tuesday",
									"Wednesday",
									"Thursday",
									"Friday",
									"Saturday"
								],
								shortDays: [
									"Su",
									"Mo",
									"Tu",
									"We",
									"Th",
									"Fr",
									"Sa"
								],
								goToToday: "Go to today"
							}}
							firstDayOfWeek={firstDayOfTheWeekDayPicker(
								modules.setting!.getSetting("weekend_num")
							)}
							dateRangeType={DateRangeType.WorkWeek}
							isMonthPickerVisible={false}
							showGoToToday={false}
							autoNavigateOnSelection
						/>
						<div className="collapse">
							<Row gutter={0}>
								<Col span={4}>
									<this.prevWeekBTN></this.prevWeekBTN>
								</Col>
								<Col span={16}>
									<IconButton
										onClick={() =>
											(this.collapsedMobileCalendar = !this
												.collapsedMobileCalendar)
										}
										iconProps={{
											iconName: this
												.collapsedMobileCalendar
												? "chevronDown"
												: "ChevronUp"
										}}
									></IconButton>
								</Col>
								<Col span={4}>
									<this.nextWeekBTN></this.nextWeekBTN>
								</Col>
							</Row>
						</div>
					</div>
				)}

				<div
					className={`week-view${
						this.collapsedMobileCalendar ? " full-height" : ""
					}`}
				>
					<div
						id="full-day-cols"
						key={JSON.stringify(this.c.selected)}
					>
						{this.c.selectedWeek.map((day, index) => {
							return (
								<div
									key={day.dateNum}
									id={"day" + "_" + day.dateNum}
									className={
										"full-day-col" +
										(this.c.selected.day === day.dateNum
											? " selected"
											: "") +
										(day.dateNum === this.c.currentDay &&
										this.c.currentMonth ===
											this.c.selected.month &&
										this.c.selected.year ===
											this.c.currentYear
											? " current"
											: "")
									}
									style={{
										width:
											(
												100 / this.c.selectedWeek.length
											).toString() + "%"
									}}
								>
									<h4>
										<Row>
											<Col span={20}>
												<b>
													{formatDate(
														new Date(
															day.yearNum,
															day.monthNum,
															day.dateNum
														),
														modules.setting!.getSetting(
															"date_format"
														)
													)}
												</b>
												&nbsp;&nbsp;
												<span className="day-name">
													{text(
														day.weekDay.dayLiteral
													)}
												</span>
											</Col>
											<Col span={4}>
												<div className="appointments-num-wrap">
													<span
														className={`appointments-num num-${this.selectedAppointments[index].length}`}
													>
														{
															this
																.selectedAppointments[
																index
															].length
														}
													</span>
												</div>
											</Col>
										</Row>
									</h4>
									{this.selectedAppointments[index]
										.sort((a, b) => a.date - b.date)
										.map(appointment => {
											return (
												<div
													key={appointment._id}
													className="appointment"
													onClick={() => {
														core.router.select({
															id: appointment._id,
															sub: "details"
														});
													}}
												>
													<div
														className={
															"time" +
															(appointment.isMissed
																? " missed"
																: appointment.isDone
																? " done"
																: "")
														}
													>
														{appointment.isMissed
															? text("Missed")
															: appointment.isDone
															? text("Done")
															: appointment.formattedTime}
													</div>
													<div className="m-b-5">
														<ProfileSquaredComponent
															text={
																appointment.treatment
																	? appointment
																			.treatment
																			.type
																	: ""
															}
															size={1}
														/>
													</div>
													<PatientLinkComponent
														id={
															(
																appointment.patient || {
																	_id: ""
																}
															)._id
														}
														name={
															(
																appointment.patient || {
																	name: ""
																}
															).name
														}
													/>
													{appointment.operatingStaff.map(
														operator => {
															return (
																<div
																	key={
																		operator._id
																	}
																	className="m-t-5 fs-11"
																>
																	<Icon iconName="Medical" />{" "}
																	{
																		operator.name
																	}
																</div>
															);
														}
													)}
												</div>
											);
										})}
								</div>
							);
						})}
					</div>
				</div>

				{this.appointment && core.router.selectedSub ? (
					<AppointmentEditorPanel
						appointment={this.appointment}
						onDismiss={() => core.router.unSelect()}
					/>
				) : (
					""
				)}
			</div>
		);
	}

	findPos(obj: HTMLElement | null) {
		let currentTop = 0;
		if (obj && obj.offsetParent) {
			do {
				currentTop += obj.offsetTop;
			} while ((obj = obj.offsetParent as HTMLElement));
			return currentTop - 70;
		}
		return 0;
	}
}
