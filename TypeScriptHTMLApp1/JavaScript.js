/// <reference path="C:\Users\andri\documents\visual studio 2015\Projects\TypeScriptHTMLApp1\TypeScriptHTMLApp1\Scripts/jquery-2.1.4.js" />

var jsBeforeSubmit = '';
// ASC-150910-OP14A - AG - 10/9/2015
$(function () {
    'use strict';

    var memberOptions = function (options) {
        this.noOfItems = options.noOfItems,
        this.baseIndex = options.baseIndex,
        this.name = options.name
    }

    var
        event = (function () {
            var
                onLREDIRECTOTClick = function () {
                    var subCtrls = [
                        ctrl.NREDIRECTOTFREQ,
                        ctrl.LREDIRECTOTEDIT,
                        ctrl.NREDIRECTOTMETH,
                        ctrl.CREDIRECTOTPC,
                        ctrl.CREDIRECTOTPCIDENT
                    ];

                    $().ntTools.setRadioOrCheckBoxCtrlStates.call(ctrl.LREDIRECTOT);
                    $().ntTools.toggleControls.call(subCtrls, ctrl.LREDIRECTOT.isChecked && ctrl.LREDIRECTOT.isEnabled);

                    onNREDIRECTOTMETHClick.call(undefined);
                    onNREDIRECTOTGRPMETHClick.call(undefined);
                    onNREDIRECTOTGRPLVLChange.call(undefined);
                    onNREDIRECTOTPCChange.call(undefined);
                    onNREDIRECTOTGChange.call(undefined);
                },

                onNREDIRECTOTMETHClick = function () {
                    var $NREDIRECTOTMETH = $('input[id^="' + ctrl.NREDIRECTOTMETH.name + '"]'),
                        values = $.map($NREDIRECTOTMETH, function (el) {
                            return $(el).is(':checked') && ctrl.LREDIRECTOT.isChecked && ctrl.LREDIRECTOT.isEnabled;
                        }),
                        subCtrls = [
                            [
                                ctrl.NREDIRECTOTPC,
                                ctrl.CREDIRECTOTREF,
                                ctrl.NREDIRECTOTGRPMETH
                            ]
                        ];

                    $().ntTools.toggleControls.call(subCtrls, values);
                },

                onNREDIRECTOTPCChange = function () {
                    var selectedPayCode = parseInt($('#' + ctrl.NREDIRECTOTPC.name).val(), 10),
                        subCtrls = [ctrl.CREDIRECTOTREF];

                    $().ntTools.toggleControls.call(subCtrls,
                        !!~$.inArray(selectedPayCode, hourNonCalcPcWithInOutTime) &&
                        ctrl.LREDIRECTOT.isChecked && ctrl.LREDIRECTOT.isEnabled);
                },

                onCREDIRECTOTREFChange = function () {
                    ValidTimeEx($(this).attr('id'));
                },

                onNREDIRECTOTGRPMETHClick = function () {
                    var $NREDIRECTOTGRPMETH = $('input[id^="' + ctrl.NREDIRECTOTGRPMETH.name + '"]'),
                        values = $.map($NREDIRECTOTGRPMETH, function (el) {
                            return $(el).is(':checked') && ctrl.LREDIRECTOT.isChecked && ctrl.LREDIRECTOT.isEnabled;
                        }),
                        subCtrls = [
                            [],
                            [
                                ctrl.NREDIRECTOTGRPLVL,
                                ctrl.NREDIRECTOTPOLMETH,
                                ctrl.NREDIRECTOTG,
                                ctrl.CREDIRECTOTGVAL,
                                ctrl.CREDIRECTOTDUMMYGVAL
                            ]
                        ]
                    ;

                    $().ntTools.toggleControls.call(subCtrls, values);
                },

                onNREDIRECTOTGRPLVLChange = function () {
                    var $groupDdlPool = $('#defined_group_pool'),
                        noOfGroups = parseInt($(this).val(), 10);

                    if (isNaN(noOfGroups)) {
                        noOfGroups = parseInt($('#' + ctrl.NREDIRECTOTGRPLVL.name).val(), 10);
                    }

                    $('tr[id^="dgr_"]').each(function (idx) {
                        var $this = $(this),
                            $groupValueColumn = $this.children().eq(3),
                            selectedGroup,
                            $groupDdl, $groupCodeDdl, $groupCodeDummyDdl;

                        if (idx < noOfGroups) {
                            $groupDdl = $this.find('select[id^="' + ctrl.NREDIRECTOTG.name + '"]');
                            selectedGroup = parseInt($groupDdl.val(), 10);

                            if (selectedGroup > 0) {
                                $groupCodeDdl = $this.find('select[id^="' + ctrl.CREDIRECTOTGVAL.name + '"]');
                                $groupCodeDummyDdl = $this.find('select[id^="' + ctrl.CREDIRECTOTDUMMYGVAL.name + '"]');
                                $groupCodeDdl.show();
                                $groupDdlPool.append($groupCodeDdl.not('#' + ctrl.CREDIRECTOTGVAL.name + selectedGroup).hide());
                                $groupDdlPool.append($groupCodeDummyDdl);
                            } else {
                                $groupCodeDummyDdl = $('#' + ctrl.CREDIRECTOTDUMMYGVAL.name + (idx + 1));
                                 $groupValueColumn.add($groupCodeDummyDdl);
                                $groupDdlPool.add($groupDdl);
                                $groupCodeDummyDdl.show();
                            }

                            $this.show();
                        } else {
                            $this.find('#' + ctrl.NREDIRECTOTG.name + (idx + 1)).val(0);
                            $groupCodeDdl = $this.find('select[id^="' + ctrl.CREDIRECTOTGVAL.name + '"]').val('!!&&||-999||&&!!');
                            $groupDdlPool.append($groupCodeDdl);
                            $groupCodeDummyDdl = $groupDdlPool.find('#' + ctrl.CREDIRECTOTDUMMYGVAL.name + (idx + 1));
                            $groupValueColumn.append($groupCodeDummyDdl);

                            $this.hide();
                        }
                    });
                },

                onNREDIRECTOTGChange = function () {
                    var $this = $(this),
                        rowNo = $this.attr('id') ? $this.attr('id').replace(/NREDIRECTOTG/g, '') : -1,
                        $groupValueColumn = $this.closest('tr').children().eq(3),
                        $groupDdlPool = $('#defined_group_pool'),
                        $groupCodeDdl, $groupCodeDummyDdl,
                        $allGroupDdls = $('select[id^="' + ctrl.NREDIRECTOTG.name + '"]')
                            .not('#' + ctrl.NREDIRECTOTGRPLVL.name),
                        $groupCodeDdl,
                        selectedValue = parseInt($this.val(), 10),
                        values = $.map($allGroupDdls, function (el) {
                            return $(el).val();
                        });

                    $allGroupDdls.each(function () {
                        var $groupDdl = $(this);

                        $groupDdl.children()
                            .not(':first')
                            .not(':selected')
                            .each(function () {
                                var $option = $(this);

                                $option.attr('disabled', !!~$.inArray($option.val(), values));
                            });
                    });

                    if (selectedValue > 0) {
                        $groupCodeDdl = $groupValueColumn.find('select[id^="' + ctrl.CREDIRECTOTGVAL.name + '"]');
                        $groupCodeDummyDdl = $groupValueColumn.find('select[id^="' + ctrl.CREDIRECTOTDUMMYGVAL.name + '"]');
                        $groupDdlPool
                            .append($groupCodeDdl.not('#' + ctrl.CREDIRECTOTGVAL.name + selectedValue).val(-1))
                            .append($groupCodeDummyDdl);
                        $groupCodeDdl = $('#' + ctrl.CREDIRECTOTGVAL.name + selectedValue);
                        $groupValueColumn.append($groupCodeDdl.show());
                    } else {
                        $groupCodeDdl = $groupValueColumn.find('select[id^="' + ctrl.CREDIRECTOTGVAL.name + '"]').val('!!&&||-999||&&!!');
                        $groupCodeDummyDdl = $groupDdlPool.find('#' + ctrl.CREDIRECTOTDUMMYGVAL.name + rowNo);
                        $groupValueColumn.append($groupCodeDummyDdl);
                        $groupDdlPool.append($groupCodeDdl);
                    }
                },

                isDefinedGroupOk = function () {
                    var isI18nOk = typeof i18n !== 'undefined' &&
                            typeof i18n.options.ns.namespaces !== 'undefined',
                        STRING_RESOURCES = {
                            ALERT_SELECT_GROUP: isI18nOk ?
                                i18n.t("alertPleaseSelectGroup") :
                                'Please select a group.',
                            ALERT_SELECT_GROUPCODE: isI18nOk ?
                                i18n.t("alertPleaseSelectGroupCode") :
                                'Please select a group code.'
                        },
                        areDefinedGroupsOk = true,
                        $allGroupDdls = $('select[id^="' + ctrl.NREDIRECTOTG.name + '"]').not('#' + ctrl.NREDIRECTOTGRPLVL.name);

                    $allGroupDdls.each(function () {
                        var $this = $(this),
                            $groupCodeDdl,
                            isEnabled = $this.is(':enabled'),
                            isVisible = $this.is(':visible'),
                            selectedValue = parseInt($this.val(), 10);

                        if (isEnabled && isVisible) {
                            if (!selectedValue) {
                                alert(STRING_RESOURCES.ALERT_SELECT_GROUP);
                                $this.focus();

                                areDefinedGroupsOk = false;

                                return false;
                            } else {
                                $groupCodeDdl = $('#' + ctrl.CREDIRECTOTGVAL.name + selectedValue);

                                if ($groupCodeDdl.val() === '!!&&||-999||&&!!') {
                                    alert(STRING_RESOURCES.ALERT_SELECT_GROUPCODE);
                                    $groupCodeDdl.focus();

                                    areDefinedGroupsOk = false;

                                    return false;
                                }
                            }
                        }
                    });

                    return areDefinedGroupsOk;
                },

                isDataOk = function () {
                    // Put all needed validations here
                    var isOk = true;

                    isOk = isDefinedGroupOk();

                    return isOk;
                },

                onBtnSaveClick = function () {
                    return event.isDataOk();
                },

                onPageLoad = function () {
                    $().ntTools.bindEvents.call(ctrl);
                    onLREDIRECTOTClick.call(undefined);
                    jsBeforeSubmit = '';
                }
            ;

            return {
                onLREDIRECTOTClick: onLREDIRECTOTClick,
                onNREDIRECTOTMETHClick: onNREDIRECTOTMETHClick,
                onNREDIRECTOTPCChange: onNREDIRECTOTPCChange,
                onCREDIRECTOTREFChange: onCREDIRECTOTREFChange,
                onNREDIRECTOTGRPMETHClick: onNREDIRECTOTGRPMETHClick,
                onNREDIRECTOTGRPLVLChange: onNREDIRECTOTGRPLVLChange,
                onNREDIRECTOTGChange: onNREDIRECTOTGChange,
                onBtnSaveClick: onBtnSaveClick,
                onPageLoad: onPageLoad
            };
        }()),

        ctrl = (function () {
            return {
                LREDIRECTOT: {
                    name: 'LREDIRECTOT',
                    event: {
                        click: event.onLREDIRECTOTClick
                    }
                },
                NREDIRECTOTFREQ: {
                    name: 'NREDIRECTOTFREQ',
                    toggleControl: $().ntTools.toggleControl
                },
                LREDIRECTOTEDIT: {
                    name: 'LREDIRECTOTEDIT',
                    toggleControl: $().ntTools.toggleControl
                },
                CREDIRECTOTPC: {
                    name: 'CREDIRECTOTPC',
                    members: $().ntTools.createMoverMember('CREDIRECTOTPC'),
                    toggleControl: $().ntTools.toggleMoverControl,
                },
                CREDIRECTOTPCIDENT: {
                    name: 'CREDIRECTOTPCIDENT',
                    members: $().ntTools.createMoverMember('CREDIRECTOTPCIDENT'),
                    toggleControl: $().ntTools.toggleMoverControl
                },
                NREDIRECTOTMETH: {
                    name: 'NREDIRECTOTMETH',
                    members: $().ntTools.createMemberNameArray(1, 0, 'NREDIRECTOTMETH_'),
                    toggleControl: $().ntTools.toggleControl,
                    event: {
                        click: event.onNREDIRECTOTMETHClick
                    }
                },
                NREDIRECTOTPC: {
                    name: 'NREDIRECTOTPC',
                    toggleControl: $().ntTools.toggleControl,
                    event: {
                        change: event.onNREDIRECTOTPCChange
                    }
                },
                CREDIRECTOTREF: {
                    name: 'CREDIRECTOTREF',
                    toggleControl: $().ntTools.toggleControl,
                    event: {
                        change: event.onCREDIRECTOTREFChange
                    }

                },
                NREDIRECTOTGRPMETH: {
                    name: 'NREDIRECTOTGRPMETH',
                    members: $().ntTools.createMemberNameArray(2, 0, 'NREDIRECTOTGRPMETH_'),
                    toggleControl: $().ntTools.toggleControl,
                    event: {
                        click: event.onNREDIRECTOTGRPMETHClick
                    }

                },
                NREDIRECTOTGRPLVL: {
                    name: 'NREDIRECTOTGRPLVL',
                    toggleControl: $().ntTools.toggleControl,
                    event: {
                        change: event.onNREDIRECTOTGRPLVLChange
                    }
                },
                NREDIRECTOTG: {
                    name: 'NREDIRECTOTG',
                    members: $().ntTools.createMemberNameArray(20, 1, 'NREDIRECTOTG'),
                    toggleControl: $().ntTools.toggleControl,
                    event: {
                        change: event.onNREDIRECTOTGChange
                    }
                },
                CREDIRECTOTGVAL: {
                    name: 'CREDIRECTOTGVAL',
                    members: $().ntTools.createMemberNameArray(20, 1, 'CREDIRECTOTGVAL'),
                    toggleControl: $().ntTools.toggleControl
                },
                CREDIRECTOTDUMMYGVAL: {
                    name: 'CREDIRECTOTDUMMYGVAL',
                    members: $().ntTools.createMemberNameArray(20, 1, 'CREDIRECTOTDUMMYGVAL'),
                    toggleControl: $().ntTools.toggleControl
                },
                NREDIRECTOTPOLMETH: {
                    name: 'NREDIRECTOTPOLMETH',
                    members: $().ntTools.createMemberNameArray(2, 0, 'NREDIRECTOTPOLMETH_'),
                    toggleControl: $().ntTools.toggleControl
                },
                BtnSave: {
                    name: 'BtnSave',
                    event: {
                        click: event.onBtnSaveClick
                    }
                }
            };
        }())
    ;

    if (document.getElementById(ctrl.LREDIRECTOT.name)) {
        event.onPageLoad();
    }
});


///////////////////////
// TEST

var CtrlObjectFactory2 = function (type) {
    'use strict';

    var
        methods = {},
        createCtrlObject = function (options) {
            var obj = {};

            if (options.name) {
                obj.name = options.name;
            }

            if (options.type) {
                obj.type = options.type;
            }

            if (options.hasDefaultToggleControlMethod) {
                obj.toggleControl = $().ntTools.toggleControl;
            }

            if (options.toggleControl) {
                obj.toggleControl = options.toggleControl;
            }

            if (options.members) {
                obj.members = options.members;
                options.members = $.map(options.members, function (el) {
                    return '#' + el;
                });
                obj.$this = $(options.members.join(','));
            } else {
                obj.$this = $('#' + options.name);
            }

            if (options.event) {
                obj.event = options.event;
            }

            return obj;
        },
        createMoverCtrlObject = function (name) {
            return {
                name: name,
                type: 'mover',
                members: $().ntTools.createMoverMember(name),
                toggleControl: $().ntTools.toggleMoverControl
            };
        }
    ;

    /*
        Return value of createCtrlObject:
        {
            name: 'name',
            $this: jQueryObject(s),
            [type: 'type'],
            [members: ['name1', 'name2', ...]],
            [toggleControl: function],
            [event: { onA: function, ... }]
        }
    */
    switch (type) {
        case 'mover':
            methods.createCtrlObject = createMoverCtrlObject;
            break;
        default:
            methods.createCtrlObject = createCtrlObject;
    }

    return methods;
};

var HtmlFormCtrlFactory = function () {
    'use strict';

    var
        createControl = function (options) {
            var baseAttr = {
                type: options.type,
                name: options.name,
                id: options.id
            };

            switch (options.type) {
                case 'select':
                    $('<' + options.type + '>').attr();
                    break;
                default:
                    $('<input>').attr($.extend(baseAttr, options));
            }
        }
    ;

    return {
        createControl: createControl
    };
};

var htmlFormCtrlFactory = new HtmlFormCtrlFactory();
htmlFormCtrlFactory.createControl({
    type: ''
});


var CtrlObjectFactory = function () {
    'use strict';

    var
        registeredCtrls = {},
        methods = {},

        registerCtrlObjects = function (ctrlObjectArray) {
            var i = 0, len = ctrlObjectArray.length;

            for (; i < len; i += 1) {
                registerCtrlObject(ctrlObjectArray[i]);
            }

            return this;
        },

        registerCtrlObject = function (ctrlObject) {
            registeredCtrls[ctrlObject.name] = ctrlObject;

            return this;
        },

        createCtrlObjects = function () {
            var ctrl = {}, ctrlName = '';

            for (ctrlName in registeredCtrls) {
                ctrl = registeredCtrls[ctrlName];
                registeredCtrls[ctrlName] = ctrl.type !== 'mover' ?
                    createCtrlObject(ctrl) : createMoverCtrlObject(ctrl);
            }

            return registeredCtrls;
        },

        createCtrlObject = function (options) {
            var obj = {};

            if (options.name) {
                obj.name = options.name;
            }

            if (options.type) {
                obj.type = options.type;
            }

            if (options.toggleControl) {
                obj.toggleControl = options.toggleControl;
            } else {
                if (!options.noDefaultToggleControl) {
                    obj.toggleControl = $().ntTools.toggleControl;
                }
            }

            if (options.members) {
                obj.members = options.members;
                options.members = $.map(options.members, function (el) {
                    return '#' + el;
                });
                obj.$ = $(options.members.join(','));
            } else {
                obj.$ = $('#' + options.name);
            }

            if (options.event) {
                obj.event = options.event;
            }

            obj.showHideCtrl = $().ntTools.showHideCtrl;

            /*
            Possible return value:
            {
                name: 'name',
                $: {jQuery object},
                [type: 'type'],
                [members: ['name1', 'name2', ...]],
                [toggleControl: function],
                [event: { onA: function, ... }]
            }
            */

            return obj;
        },

        createMoverCtrlObject = function (options) {
            return {
                name: options.name,
                type: options.type,
                members: $().ntTools.createMoverMember(options.name),
                toggleControl: $().ntTools.toggleMoverControl
            };
        },

        getRegisteredCtrls = function () {
            return getRegisteredCtrls;
        }
    ;

    return {
        registerCtrlObjects: registerCtrlObjects,
        registerCtrlObject: registerCtrlObject,
        createCtrlObjects: createCtrlObjects,
        getRegisteredCtrls: getRegisteredCtrls
    };
};

(function ($) {
    'use strict';

    if ($) {
        $.fn.ntTools = (function () {
            return {
                createMemberNameArray: function (noOfItems, baseIndex, ctrlName, ctrlNamePostfix) {
                    var i = 0,
                        members = [];

                    noOfItems -= baseIndex;

                    for (; i < noOfItems; i += 1) {
                        members[i] = (ctrlName || this.name) +
                            (i + baseIndex).toString() +
                            (ctrlNamePostfix ? ctrlNamePostfix : '');
                    }

                    if (this.name) {
                        this.members = members;

                        return this;
                    } else {
                        return members;
                    }
                },

                createMoverMember: function (name) {
                    var name = name || this.name,
                        obj = {
                            SOURCE: {
                                name: name + '_' + name + '_SOURCE',
                                event: {
                                    dblclick: function () { MoveMe(name, this); },
                                }
                            },
                            TARGET: {
                                name: name + '_' + name + '_TARGET',
                                event: {
                                    dblclick: function () { MoveMe(name, this); }
                                }
                            },
                            ADD_ONE: {
                                name: name + '_ADD_ONE',
                                event: {
                                    click: function () { MoveOne(name, 'right'); }
                                }
                            },
                            ADD_ALL: {
                                name: name + '_ADD_ALL',
                                event: {
                                    click: function () { MoveAll(name, 'right'); }
                                }
                            },
                            REM_ONE: {
                                name: name + '_REM_ONE',
                                event: {
                                    click: function () { MoveOne(name, 'left'); }
                                }
                            },
                            REM_ALL: {
                                name: name + '_REM_ALL',
                                event: {
                                    click: function () { MoveAll(name, 'left'); }
                                }
                            },
                            MOVE_UP: {
                                name: name + '_MOVE_UP',
                                event: {
                                    click: function () { Move(name, 'up'); }
                                }
                            },
                            MOVE_DOWN: {
                                name: name + '_MOVE_DOWN',
                                event: {
                                    click: function () { Move(name, 'down'); }
                                }
                            }
                        };

                    if (this.name) {
                        this.members = obj;

                        return this;
                    } else {
                        return obj;
                    }
                },

                toggleControl: function (isEnabled) {
                    //this.members ?
                    //    $.each(this.members, function () {
                    //        $('#' + (this.name || this)).attr('disabled', !isEnabled);
                    //    }) :
                    //    $('#' + this.name).attr('disabled', !isEnabled);
                    if (this.members) {
                        if (this.$this) {
                            this.$this.each(function () {
                                $(this).attr('disabled', !isEnabled);
                            });
                        } else {
                            $.each(this.members, function () {
                                $('#' + (this.name || this)).attr('disabled', !isEnabled);
                            })
                        }
                    } else {
                        if (this.$this) {
                            this.$this.attr('disabled', !isEnabled);
                        } else {
                            $('#' + this.name).attr('disabled', !isEnabled)
                        }
                    }
                },

                toggleMoverControl: function (isEnabled) {
                    var $member;

                    $.each(this.members, function () {
                        $member = $('#' + this.name);
                        $member.attr('disabled', !isEnabled);

                        if (this.event) {
                            $member.unbind();

                            if (isEnabled) {
                                $member.bind(this.event);
                            } else {
                                $member.removeAttr('onclick').removeAttr('ondblclick');
                            }
                        }
                    });
                },

                bindEvents: function () {
                    var that = null;

                    $.each(this, function () {
                        that = this;

                        if (this.event) {
                            if (!this.members) {
                                if (!this.$this) {
                                    $('#' + this.name).bind(this.event);
                                } else {
                                    this.$this.bind(this.event);
                                }
                            } else {
                                if (!this.$this) {
                                    $('[id^="' + this.name + '"]').bind(this.event);
                                } else {
                                    if ($.isArray(this.$this)) {
                                        $.each(this.$this, function () {
                                            this.bind(that.event);
                                        });
                                    }
                                }
                            }
                        }
                    });
                },

                setRadioOrCheckBoxCtrlStates: function (/* related control objects... */) {
                    if (this.name) {
                        var $ctrl = this.$this || $('#' + this.name),
                            args = [].slice.call(arguments),
                            isEnabled = true,
                            i = 0, argsLen = args.length;

                        for (; i < argsLen; i += 1) {
                            isEnabled = $ctrl.is(':enabled') && args[i].isChecked && args[i].isEnabled;

                            if (!isEnabled) {
                                break;
                            }
                        }

                        this.isChecked = $ctrl.is(':checked');
                        this.isEnabled = isEnabled;
                    }
                },

                // value can be array of value or a value of boolean
                toggleControls: function (value) {
                    $.each(this, function (idx) {
                        if ($.isArray(this)) {
                            $.each(this, function () {
                                if (this.toggleControl) {
                                    this.toggleControl.call(this, $.isArray(value) ? value[idx] : value);
                                }
                            });
                        } else {
                            if (this.toggleControl) {
                                this.toggleControl.call(this, value);
                            }
                        }
                    });
                },

                switchControl: function (replacementCtrl) {
                    var $this = $(this),
                        $replacement = $(replacementCtrl);

                    if ($this.is(':visible')) {
                        $this.hide();
                    } else {
                        $this.show();
                    }

                    $this.after($replacement);
                }
            };
        }());
    }
}(typeof jQuery !== 'undefined' ? jQuery : undefined));


var Bread = (function () {
    function Bread(breadType) {
        this.breadType = breadType;
        //some complex, time consuming operation
        console.log("Bread " + breadType + " created.");
    }

    return Bread;
})();

var Bakery = (function () {
    function Bakery() {
        this.requiredBreads = [];
    }

    Bakery.prototype.orderBreadType = function (breadType) {
        this.requiredBreads.push(breadType);
    }

    Bakery.prototype.pickUpBread = function (breadType) {
        console.log("Pickup of bread " + breadType + " requested");
        if (!this.breads) {
            this.createBreads();
        }

        for (var i = 0; i < this.breads.length; i++) {
            if (this.breads[i].breadType == breadType)
                return this.breads[i];
        }
    };

    Bakery.prototype.createBreads = function () {
        this.breads = [];

        for (var i = 0; i < this.requiredBreads.length; i++) {
            this.breads.push(new Bread(this.requiredBreads[i]));
        }
    };
})();

var bakery = new Bakery();
bakery.orderBreadType("Brioche");
bakery.orderBreadType("Anadama bread");
bakery.orderBreadType("Chapati");
bakery.orderBreadType("Focaccia");

console.log(bakery.pickUpBread("Brioche").breadType + "pickedup");

var Factory = function () {
    var
        registeredCtrl = [],

        registerCtrl = function (options) {
            var obj = {};
            obj[obj.name] = options.name;

            registeredCtrl[registeredCtrl.length] = obj;
        }
    ;
};

var factory2 = function () {

};

var tpm = function () {

};