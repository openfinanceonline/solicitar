var iconValState;
function Validation() {
    (this.validatorCompar = function (a, t) {
        var i = new RegExp("^[_X-x0-9]{1,}$"),
            n = (new RegExp("^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$"), new RegExp("^[0-9]+$"));
        switch (t) {
            case "cnpj":
                return this.validarCNPJ(a);
            case "cpf":
                return this.validarCPF(a);
            case "datanasc":
                return /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/.test(
                    a
                );
            case "cpf":
                return this.validarCPF(a);
            case "email":
                return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-z.]+$/g.test(a);
            case "name":
                return this.validarName(a);
            case "cel":
                return "" == a || /\([0-9]{2}\)\s[9][0-9]{4}\-[0-9]{4}/g.test(a);
            case "tel":

                return "" == a || /(\([0-9]{2}\)\s[2-5][0-9]{3}\-[0-9]{4})/g.test(a);
            case "celreq":
                if(a.includes("(") || a.includes("-")){
                  	a = a;
                }
                else
                {
                 	a = a.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2').replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3').replace(/(-\d{4})\d+?$/, '$1');
                }
                return /\([0-9]{2}\)\s[9][0-9]{4}\-[0-9]{4}/g.test(a);
            case "telreq":
                return /(\([0-9]{2}\)\s[2-5][0-9]{3}\-[0-9]{4})/g.test(a);
            case "telcel":
                return /(\([0-9]{2}\)\s[0-9]{4}\-[0-9]{4})/g.test(a);
            case "cep":
                return /[0-9][0-9]{4}\-[0-9]{3}/g.test(a);
            case "pass":
            case "required":
                return /[A-zÀ-ÿ!-_]/g.test(a);
            case "banks":
                return i.test(a);
            case "cidade-nascimento":
                return this.validarCidadeNascimento(a);
            case "numbers":
                return n.test(a.replace(/[^a-zA-Z0-9 ]/g, ""));
            case "datExpedicao":
                return this.validarDataExpedicao(a);
            case "datNascimentoEmprestimo":
                return this.validarDataNascimentoEmprestimo(a);
            case "renda-mensal":
                return this.validarRendaMensal(a);
            case "parcelas":
                return this.validarParcelas(a);
			case "confirma-senha":
                return this.ConfirmaSenha(a);
			case "senha":
                return this.validarPassword(a);
			
        }
    }),
        (this.validarCNPJ = function (a) {
            if ("" == (a = a.replace(/[^\d]+/g, ""))) return !1;
            if (14 != a.length) return !1;
            if (
                "00000000000000" == a ||
                "11111111111111" == a ||
                "22222222222222" == a ||
                "33333333333333" == a ||
                "44444444444444" == a ||
                "55555555555555" == a ||
                "66666666666666" == a ||
                "77777777777777" == a ||
                "88888888888888" == a ||
                "99999999999999" == a
            )
                return !1;
            for (tamanho = a.length - 2, numeros = a.substring(0, tamanho), digitos = a.substring(tamanho), soma = 0, pos = tamanho - 7, i = tamanho; i >= 1; i--) (soma += numeros.charAt(tamanho - i) * pos--), pos < 2 && (pos = 9);
            if (((resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)), resultado != digitos.charAt(0))) return !1;
            for (tamanho += 1, numeros = a.substring(0, tamanho), soma = 0, pos = tamanho - 7, i = tamanho; i >= 1; i--) (soma += numeros.charAt(tamanho - i) * pos--), pos < 2 && (pos = 9);
            return (resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)), resultado == digitos.charAt(1);
        }),
        (this.validarCPF = function (a) {
            var t, n;
            if (
                ((t = 0),
                "00000000000" == (a = (a = a).replace(/[^\d]+/g, "")) ||
                    "11111111111" == a ||
                    "22222222222" == a ||
                    "33333333333" == a ||
                    "44444444444" == a ||
                    "55555555555" == a ||
                    "66666666666" == a ||
                    "77777777777" == a ||
                    "88888888888" == a ||
                    "99999999999" == a)
            )
                return !1;
            for (i = 1; i <= 9; i++) t += parseInt(a.substring(i - 1, i)) * (11 - i);
            if (((10 != (n = (10 * t) % 11) && 11 != n) || (n = 0), n != parseInt(a.substring(9, 10)))) return !1;
            for (t = 0, i = 1; i <= 10; i++) t += parseInt(a.substring(i - 1, i)) * (12 - i);
            return (10 != (n = (10 * t) % 11) && 11 != n) || (n = 0), n == parseInt(a.substring(10, 11));
        }),
        (this.validarDataExpedicao = function (a) {
            var t = a.split("/"),
                i = new Date();
            return (
                !(new Date(t[2], t[1] - 1, t[0]) > i) &&
                /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/.test(
                    a
                )
            );
        }),
        (this.validarDataNascimentoEmprestimo = function (a) {
            var t = a.split("/");
            return (
                !(parseInt(t[2]) <= 1940 || parseInt(t[2]) > 2002) &&
                /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/.test(
                    a
                )
            );
        }),
        (this.validarRendaMensal = function (a) {
            return !(parseInt(a.replace(/\D+/g, "")) > 5e6);
        }),
        (this.validarParcelas = function (a) {
            return 0 != a;
        }),
        (this.validarName = function (a) {
            return !hasNumbers(a) && /[A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-zÀ-ÿ'][A-zÀ-ÿ']+/g.test(a);
        }),
		(this.ConfirmaSenha = function (a) {
            if(a != $( "#strPassword" ).val())
			{

				return !1;
			}
			else{
	
				return true;
			}
        }),
		(this.validarPassword = function (a) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(a);
        }),
		(this.validarName = function (a) {
            return !hasNumbers(a) && /[A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-zÀ-ÿ'][A-zÀ-ÿ']+/g.test(a);
        }),
        (this.validarCidadeNascimento = function (a) {
            return !(hasNumbers(a) || a.length <= 1);
        });
}

function hasNumbers(a) {
    return /\d/g.test(a);
}

function ValidationStatus() {
    (this.validationIcons = function (a, t, i) {
        iconValState = [a, t, i];
    }),
        (this.validationIcon = function (a, t, i) {
            switch ((a.html(""), t)) {
                case "Standby":
                    a.append('<span class="standby material-icons">' + iconValState[1] + "</span>");
                    break;
                case "Valid":
                    a.append('<span class="valid material-icons ">' + iconValState[2] + "</span>");
                    break;
                case "Invalid":
                    a.append('<span class="invalid material-icons tada">' + iconValState[0] + "</span>");
                    break;
                case "InvalidTooltip":
                    a.append('<span class="invalid material-icons tada tooltipinvalid">' + iconValState[0] + ' <span class="validation-tooltip">' + i + "</span></span>");
            }
        });
}
function ValidationEvent() {
    var a = new Validation(),
        t = new ValidationStatus();
    t.validationIcons("sentiment_very_dissatisfied", "sentiment_neutral", "sentiment_very_satisfied"),
        (verifyValues = function (t, i) {
            return a.validatorCompar(t, i);
        }),
        (this.validationKeyUp = function (a) {
            var i = $(a).parent().find(".input-valid-status");
            "true" == $(a).attr("validation-status") || null == $(a).attr("validation-status")
                ? 1 == verifyValues($(a).val(), $(a).attr("validation-type"))
                    ? t.validationIcon(i, "Valid", "")
                    : t.validationIcon(i, "Standby", "")
                : ("false" != $(a).attr("validation-status") && "true" == $(a).attr("validation-status")) || t.validationIcon(i, "Valid", "");
        }),
        (this.validationBlur = function (a, i) {
            var n = $(a).parent().find(".input-valid-status");
            return (
                null == i && (i = ""),
                "true" == $(a).attr("validation-status") || null == $(a).attr("validation-status")
                    ? 1 == verifyValues($(a).val(), $(a).attr("validation-type"))
                        ? (t.validationIcon(n, "Valid", i), !0)
                        : ("true" == $(a).attr("validation-tooltip-status") || null == $(a).attr("validation-tooltip-status")
                              ? t.validationIcon(n, "InvalidTooltip", i)
                              : ("false" != $(a).attr("validation-tooltip-status") && "true" == $(a).attr("validation-tooltip-status")) || t.validationIcon(n, "Invalid", i),
                          !1)
                    : "false" == $(a).attr("validation-status") || "true" != $(a).attr("validation-status")
                    ? (t.validationIcon(n, "Valid", ""), !0)
                    : void 0
            );
        }),
        (this.validationSubmit = function (a) {
            var t = !0;
            return (
                $(a).each(function () {
                    if (1 != verifyValues($(this).val(), $(this).attr("validation-type"))) return (t = !1), !1;
                }),
                t
            );
        });
}




