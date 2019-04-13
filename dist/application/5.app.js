(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./src/modules/patients/components/page.patients.tsx":
/*!***********************************************************!*\
  !*** ./src/modules/patients/components/page.patients.tsx ***!
  \***********************************************************/
/*! exports provided: PatientsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PatientsPage\", function() { return PatientsPage; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _common_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @common-components */ \"./src/common-components/index.ts\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core */ \"./src/core/index.ts\");\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @modules */ \"./src/modules/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @utils */ \"./src/utils/index.ts\");\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mobx */ \"./node_modules/mobx/lib/mobx.module.js\");\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mobx-react */ \"./node_modules/mobx-react/index.module.js\");\n/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! office-ui-fabric-react */ \"./node_modules/office-ui-fabric-react/lib/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\nlet PatientsPage = class PatientsPage extends react__WEBPACK_IMPORTED_MODULE_8__[\"Component\"] {\n    constructor() {\n        super(...arguments);\n        this.selectedId = _core__WEBPACK_IMPORTED_MODULE_2__[\"router\"].currentLocation.split(\"/\")[1];\n        this.viewWhich = _core__WEBPACK_IMPORTED_MODULE_2__[\"router\"].currentLocation.split(\"/\")[1]\n            ? 1\n            : 0;\n    }\n    get patient() {\n        return _modules__WEBPACK_IMPORTED_MODULE_3__[\"patients\"].list.find(patient => patient._id === this.selectedId);\n    }\n    get canEdit() {\n        return _core__WEBPACK_IMPORTED_MODULE_2__[\"user\"].currentUser.canEditPatients;\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"div\", { className: \"patients-component p-15 p-l-10 p-r-10\" },\n            this.patient ? (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Panel\"], { key: this.selectedId + this.viewWhich, isOpen: !!this.patient, type: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PanelType\"].medium, closeButtonAriaLabel: \"Close\", isLightDismiss: true, onDismiss: () => {\n                    this.selectedId = \"\";\n                    this.viewWhich = 0;\n                }, onRenderNavigation: () => {\n                    return (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Row\"], { className: \"panel-heading\" },\n                        react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { span: 22 },\n                            react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileComponent\"], { name: this.patient.name, secondaryElement: react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"div\", null,\n                                    this.viewWhich === 1\n                                        ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Patient Details\")\n                                        : \"\",\n                                    this.viewWhich === 2\n                                        ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Dental History\")\n                                        : \"\",\n                                    this.viewWhich === 3\n                                        ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Gallery and X-Rays\")\n                                        : \"\",\n                                    this.viewWhich === 4\n                                        ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Patient Appointments\")\n                                        : \"\"), size: 3 })),\n                        react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], { span: 2, className: \"close\" },\n                            react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { iconProps: { iconName: \"cancel\" }, onClick: () => {\n                                    this.selectedId = \"\";\n                                    this.viewWhich = 0;\n                                } }))));\n                } },\n                this.viewWhich === 1 ? (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_modules__WEBPACK_IMPORTED_MODULE_3__[\"PatientDetailsPanel\"], { patient: this.patient })) : (\"\"),\n                this.viewWhich === 2 ? (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_modules__WEBPACK_IMPORTED_MODULE_3__[\"DentalHistoryPanel\"], { patient: this.patient })) : (\"\"),\n                this.viewWhich === 3 ? (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_modules__WEBPACK_IMPORTED_MODULE_3__[\"PatientGalleryPanel\"], { patient: this.patient })) : (\"\"),\n                this.viewWhich === 4 ? (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_modules__WEBPACK_IMPORTED_MODULE_3__[\"PatientAppointmentsPanel\"], { patient: this.patient })) : (\"\"))) : (\"\"),\n            react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"DataTableComponent\"], { maxItemsOnLoad: 10, className: \"patients-data-table\", heads: [\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Patient\"),\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Last/Next Appointment\"),\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Total/Outstanding Payments\"),\n                    Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Label\")\n                ], rows: _modules__WEBPACK_IMPORTED_MODULE_3__[\"patients\"].list.map(patient => ({\n                    id: patient._id,\n                    searchableString: patient.searchableString,\n                    cells: [\n                        {\n                            dataValue: patient.name +\n                                \" \" +\n                                patient.age +\n                                \" \" +\n                                Object(_modules__WEBPACK_IMPORTED_MODULE_3__[\"genderToString\"])(patient.gender),\n                            component: (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"div\", null,\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileComponent\"], { name: patient.name, secondaryElement: react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"span\", null,\n                                        Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(Object(_modules__WEBPACK_IMPORTED_MODULE_3__[\"genderToString\"])(patient.gender)),\n                                        \" \",\n                                        \"- \",\n                                        patient.age,\n                                        \" \",\n                                        Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"years old\")), size: 3 }),\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"br\", null),\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Patient Details\") },\n                                    react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button\", iconProps: {\n                                            iconName: \"DietPlanNotebook\"\n                                        }, onClick: () => {\n                                            this.selectedId =\n                                                patient._id;\n                                            this.viewWhich = 1;\n                                        } })),\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Dental History\") },\n                                    react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button\", iconProps: {\n                                            iconName: \"Teeth\"\n                                        }, onClick: () => {\n                                            this.selectedId =\n                                                patient._id;\n                                            this.viewWhich = 2;\n                                        } })),\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Gallery and X-Rays\") },\n                                    react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button\", iconProps: {\n                                            iconName: \"PhotoCollection\"\n                                        }, onClick: () => {\n                                            this.selectedId =\n                                                patient._id;\n                                            this.viewWhich = 3;\n                                        } })),\n                                _core__WEBPACK_IMPORTED_MODULE_2__[\"user\"].currentUser\n                                    .canViewAppointments ? (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Patient Appointments\") },\n                                    react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button\", iconProps: {\n                                            iconName: \"Calendar\"\n                                        }, onClick: () => {\n                                            this.selectedId =\n                                                patient._id;\n                                            this.viewWhich = 4;\n                                        } }))) : (\"\"),\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"TooltipHost\"], { content: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Delete\") },\n                                    react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"IconButton\"], { className: \"action-button delete\", iconProps: {\n                                            iconName: \"Trash\"\n                                        }, onClick: () => _modules__WEBPACK_IMPORTED_MODULE_3__[\"patients\"].deleteModal(patient._id), disabled: !this.canEdit })))),\n                            className: \"no-label\"\n                        },\n                        {\n                            dataValue: (patient.lastAppointment ||\n                                patient.nextAppointment || { date: 0 }).date,\n                            component: (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"div\", null,\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: patient.lastAppointment\n                                        ? patient.lastAppointment\n                                            .treatment\n                                            ? patient\n                                                .lastAppointment\n                                                .treatment.type\n                                            : \"\"\n                                        : \"\", subText: patient.lastAppointment\n                                        ? Object(_utils__WEBPACK_IMPORTED_MODULE_4__[\"formatDate\"])(patient\n                                            .lastAppointment\n                                            .date, _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"date_format\"))\n                                        : Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"No last appointment\"), size: 3, onRenderInitials: () => (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Icon\"], { iconName: \"Previous\" })), onClick: () => { }, initialsColor: patient.lastAppointment\n                                        ? undefined\n                                        : office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].transparent }),\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"br\", null),\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: patient.nextAppointment\n                                        ? patient.nextAppointment\n                                            .treatment\n                                            ? patient\n                                                .nextAppointment\n                                                .treatment.type\n                                            : \"\"\n                                        : \"\", subText: patient.nextAppointment\n                                        ? Object(_utils__WEBPACK_IMPORTED_MODULE_4__[\"formatDate\"])(patient\n                                            .nextAppointment\n                                            .date, _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"date_format\"))\n                                        : Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"No next appointment\"), size: 3, onRenderInitials: () => (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Icon\"], { iconName: \"Next\" })), onClick: () => { }, initialsColor: patient.nextAppointment\n                                        ? undefined\n                                        : office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].transparent }))),\n                            className: \"hidden-xs\"\n                        },\n                        {\n                            dataValue: patient.totalPayments,\n                            component: (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"div\", null,\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"currencySymbol\") +\n                                        patient.totalPayments.toString(), subText: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Payments made\"), size: 3, onRenderInitials: () => (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Icon\"], { iconName: \"CheckMark\" })), onClick: () => { }, initialsColor: patient.totalPayments > 0\n                                        ? office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].darkBlue\n                                        : office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].transparent }),\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"br\", null),\n                                react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"ProfileSquaredComponent\"], { text: _modules__WEBPACK_IMPORTED_MODULE_3__[\"setting\"].getSetting(\"currencySymbol\") +\n                                        (patient.differenceAmount < 0\n                                            ? patient.outstandingAmount.toString()\n                                            : patient.differenceAmount >\n                                                0\n                                                ? patient.overpaidAmount.toString()\n                                                : \"0\"), subText: patient.differenceAmount < 0\n                                        ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Outstanding amount\")\n                                        : patient.differenceAmount >\n                                            0\n                                            ? Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Overpaid amount\")\n                                            : Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"No outstanding amount\"), size: 3, onRenderInitials: () => (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"Icon\"], { iconName: \"Cancel\" })), onClick: () => { }, initialsColor: patient.differenceAmount !== 0\n                                        ? office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].darkRed\n                                        : office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_7__[\"PersonaInitialsColor\"].transparent }))),\n                            className: \"hidden-xs\"\n                        },\n                        {\n                            dataValue: patient.labels\n                                .map(x => x.text)\n                                .join(\",\"),\n                            component: (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](\"div\", null, patient.labels.map((label, index) => {\n                                return (react__WEBPACK_IMPORTED_MODULE_8__[\"createElement\"](_common_components__WEBPACK_IMPORTED_MODULE_1__[\"TagComponent\"], { key: index, text: label.text, type: label.type }));\n                            }))),\n                            className: \"hidden-xs\"\n                        }\n                    ]\n                })), commands: this.canEdit\n                    ? [\n                        {\n                            key: \"addNew\",\n                            title: \"Add new\",\n                            name: Object(_core__WEBPACK_IMPORTED_MODULE_2__[\"text\"])(\"Add new\"),\n                            onClick: () => {\n                                const patient = new _modules__WEBPACK_IMPORTED_MODULE_3__[\"Patient\"]();\n                                _modules__WEBPACK_IMPORTED_MODULE_3__[\"patients\"].list.push(patient);\n                                this.selectedId = patient._id;\n                                this.viewWhich = 1;\n                            },\n                            iconProps: {\n                                iconName: \"Add\"\n                            }\n                        }\n                    ]\n                    : [] })));\n    }\n};\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"observable\"]\n], PatientsPage.prototype, \"selectedId\", void 0);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"observable\"]\n], PatientsPage.prototype, \"viewWhich\", void 0);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"computed\"]\n], PatientsPage.prototype, \"patient\", null);\ntslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx__WEBPACK_IMPORTED_MODULE_5__[\"computed\"]\n], PatientsPage.prototype, \"canEdit\", null);\nPatientsPage = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\n    mobx_react__WEBPACK_IMPORTED_MODULE_6__[\"observer\"]\n], PatientsPage);\n\n\n\n//# sourceURL=webpack:///./src/modules/patients/components/page.patients.tsx?");

/***/ })

}]);