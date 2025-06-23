$(document).ready(function() {

    const url = window.location.href

    const anchor = url.split('=')[1]

    if (anchor === 'vantagens') {
        window.scroll({ top: 970, left: 0, behavior: 'smooth' })
    }

    if (anchor === 'quem-somos') {
        window.scroll({ top: 1830, left: 0, behavior: 'smooth' })
    }
    if (anchor === 'porque-nos') {
        window.scroll({ top: 2580, left: 0, behavior: 'smooth' })
    }
    if (anchor === 'opcoes-emprestimos') {
        window.scroll({ top: 3080, left: 0, behavior: 'smooth' })
    }

    if (anchor === 'home') {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
    if (location.search.split("anchor=")[1] == "form") {
        //e.preventDefault();
        scrollToAnchor('form');
    }

    $("#strCep").on("keyup", function() {
        if ($(this).val().length == 9) {
            ConsultaCepBPC(getValue("strCep"));
            setTimeout(function() {
                if (getValue("rIdCidades") > 0) {
                    ConsultaDDD(parseInt(getValue("rIdCidades")));
                }
            }, 3000);
        }
    });
    if (location.search.split("c=")[1] == "sim") {
        $("#conteudo").addClass("d-none");
        $("#agradecimento").removeClass("d-none");
        return;
    }

    var validationCls = new ValidationEvent();
    $("#strTelefone").mask("(00) 00000-0000");
    $("#strRendaMensal").maskMoney({
        prefix: "R$ ",
        decimal: ",",
        thousands: "."
    });

    $("#strCep").mask("00000-000");
    $("#strCpfCnpj").mask("000.000.000-00");

    $(".input-validation").on("keyup change", function() {
        validationCls.validationKeyUp(this);
    });

    $(".input-validation").on("change focusout", function() {
        validationCls.validationBlur(
            this,
            $(this).attr("validation-tooltip-errortext")
        );
    });

    $(".input-validation").on("keyup change", function() {
        validationCls.validationKeyUp(this);
    });

    $(".input-validation").on("change focusout", function() {
        validationCls.validationBlur(
            this,
            $(this).attr("validation-tooltip-errortext")
        );
    });

    // Validation 2
    $(".input-validation2").on("keyup change", function() {
        validationCls.validationKeyUp(this);
    });

    $(".input-validation2").on("change focusout", function() {
        validationCls.validationBlur(
            this,
            $(this).attr("validation-tooltip-errortext")
        );
    });

    $(".input-validation2").on("keyup change", function() {
        validationCls.validationKeyUp(this);
    });

    $(".input-validation2").on("change focusout", function() {
        validationCls.validationBlur(
            this,
            $(this).attr("validation-tooltip-errortext")
        );
    });

    var params = window.location.search;
    $(".input-validation-step1").on("keyup change", function() {

        var contErro = 0;
        if ($('#checkTermos').is(':checked')) {
            $('#inputTermos').val('1');
        } else {
            $('#inputTermos').val('');
            contErro = 1;
            // scrollTo($('#checkTermos'));
        }

        $(".input-validation").each(function() {
            validationCls.validationBlur($(this), $(this).attr('validation-tooltip-errortext'));
            if (!validationCls.validationBlur($(this), $(this).attr('validation-tooltip-errortext'))) {
                contErro++;
            }
        });

        if (contErro == 0) {

            $(".salva-session").removeClass("disabled");
            $(".btn-avancar").removeClass("disable");



        } else {
            $(".salva-session").addClass("disabled");
            $(".btn-avancar").addClass("disable");
        }
    });
    $(".salva-session").click(function(e) {

        sessionStorage.setItem('strNome', $('#strNome').val());
        sessionStorage.setItem('strEmail', $('#strEmail').val());
        sessionStorage.setItem('strTelefone', $('#strTelefone').val());
        sessionStorage.setItem('fltValorEmprestimo', $('#fltValorEmprestimo :selected').val());
        sessionStorage.setItem('contador' , 1);
    });


});

function GeraContatoMautic(jsonRequest) {

    $.ajax({
        method: "POST",
        url: "https://tags.consultaweb.com.br/CreateContact.php",
        cache: false,
        sync: false,
        type: 'post',
        data: {
            'rel': jsonRequest,
        },
        success: function(result) {
            console.log(result);
        },
        error: function(result) {
            console.log(result);
        }
    });
}

function GeraLeadIntencoes(jsonRequest) {

    $.ajax({
        method: "POST",
        url: "https://api-emprestimohoje.cenarioconsulta.com.br/api/adiciona/lead_intencoes/emprestimo",
        cache: false,
        sync: false,
        type: 'post',
        data: JSON.stringify(jsonRequest),
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            "Authorization": "Bearer LWxkWGaBUgZzsn1yAnuodQncSM4HsMe0ZTVoU0Yl",
            'Access-Control-Allow-Origin': 'https://api-emprestimohoje.cenarioconsulta.com.br',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
        success: function(result) {
            console.log(result);
        },
        error: function(result) {
            console.log(result);
        }
    });
}


$(".beneficio").click(function(e) {
    e.preventDefault();
    $(".beneficio").each(function() {
        $(this).addClass('active');
    })
    $(this).removeClass('active');
    var beneficio = $(this).val()
    $('#strBeneficio').val(beneficio);

})

$('.valorBenficio').click(function(e) {
    e.preventDefault();
    $(".valorBenficio").each(function() {
        $(this).addClass('active');
    })
    $(this).removeClass('active');
    var valor = $(this).val();
    $("#strValorBeneficio").val(valor)
    calcEmprestimo(valor);
    if (valor != "4") {
        $("#limiteEmprestimo").removeClass('d-none');
    } else {
        // scrollToAnchor('Conteudos-Ancoragem');
        $("#strValorBeneficio").val("")
        $("#strValorBeneficio").maskMoney({
            prefix: "R$ ",
            decimal: ",",
            thousands: "."
        });
    }


})

$("#calcInput").click(function(e) {
    e.preventDefault();
    var valor = $('#strValorBeneficio').val();

    calcEmprestimo(valor);
    $("#limiteEmprestimo").removeClass('d-none')
})

function calcEmprestimo(beneficio) {
    if (beneficio == '1') {
        beneficio = 1045
    } else if (beneficio == '2') {
        beneficio = 1500
    } else if (beneficio == '3') {
        beneficio = 2300
    } else if (beneficio == '4') {
        $(".valorBenficio").each(function() {
            $(this).addClass('d-none');
        })
        $("#strValorBeneficio").removeAttr('type')
        $("#calcInput").removeClass('d-none')
        return 0
    } else {
        beneficio = beneficio.replace('.', '').replace('R$ ', '').replace(',', '.')
    }

    i = 0.02; // Juros
    n = 84; // Parcelas
    pmt = parseInt(beneficio) * 0.30; //Valor de parcela maxima 30% do salario base 

    div = ((i * Math.pow((1 + i), n)) / (Math.pow((1 + i), n) - 1))

    pv = pmt / div //Valor final

    pv = pv.toFixed(2)
    pv = numberToReal(pv)
    pmt = numberToReal(pmt)

    $('#valorPv').html(pv)
    $('#valorPv').val(pv)

    $('#strParcelas').html(pmt)
}

function numberToReal(numero) {
    numero = parseInt(numero)
    var numero = numero.toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    var final = numero.join(',')
    return "R$ " + final;
}

function scrollToAnchor(aid) {
    var elmnt = document.getElementById(aid);
    elmnt.scrollIntoView(false);
}

function obtemParametroUri(nomeParametro) {
    var nomeParametro = location.search.slice(1);
    var partes = nomeParametro.split('&');
    var data = {};
    partes.forEach(function(parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });


    return (data);
};


function novaAba(url, url_mesma_janela) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var device = 'PC';
    if (/android/i.test(userAgent)) {
        device = "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        device = "iOS";
    }

    if (device == 'iOS') {
        window.location.assign(url_mesma_janela);
        return window.open(url, '_system'), setTimeout(function() {
            window.location.href = url_mesma_janela;
        }, 3000);
    } else {
        return window.open(url, '_blank'), setTimeout(function() {
            window.location.href = url_mesma_janela;
        }, 3000);
    }

}

// function SaltarPixel(Pixel) {

//     if (obtemParametroUri("ad_id")["ad_id"])
//         parametro = obtemParametroUri("ad_id")["ad_id"];
//     else parametro = "cenario";
//     var t = Pixel.replace(/\'/g, '"').replace(/\pixeldeespera/g, "<iframe").replace(/\/fechapixel/g, "</iframe>").replace('{TRANSACTION_ID}', parametro).replace(/\${script}/g, "<script>").replace(/\${fechascript}/g, "</script>");
//     $("body").append(t);
// }

function SaltarPixel() {
    var strEmail = sessionStorage.getItem('strEmail');
    if (obtemParametroUri("ad_id")["ad_id"])
        parametro = obtemParametroUri("ad_id")["ad_id"];
    else parametro = "cenario";
    var PixelConversao = $("#PixelMarketing").val().replace(/\'/g, '"').replace(/\pixeldeespera/g, "<iframe").replace(/\/fechapixel/g, "</iframe>").replace('{TRANSACTION_ID}', parametro).replace(/\${script}/g, "<script>").replace(/\${fechascript}/g, "</script>").replace("$_EMAIL",strEmail);
    
    $('body').append(PixelConversao);
   
}


function GeraLeadEmprestimo(jsonRequest) {

    $.ajax({
        method: "POST",
        url: "https://api-emprestimohoje.cenarioconsulta.com.br/api/adiciona/lead_lps/emprestimo",
        cache: false,
        sync: false,
        type: 'post',
        data: JSON.stringify(jsonRequest),
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            "Authorization": "Bearer LWxkWGaBUgZzsn1yAnuodQncSM4HsMe0ZTVoU0Yl",
            'Access-Control-Allow-Origin': 'https://api-emprestimohoje.cenarioconsulta.com.br',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
        success: function(result) {
            console.log(result);
        },
        error: function(result) {
            console.log(result);
        }
    });
}

function GeraPreLead() {
    var tokenProd = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU3YmQwOThhYzAwYzZmZTZhYjFiZWRlNDFkNWM0ZWFiYzQ0NGU2YzU0NWVhOWNhY2RhZWIyOTlhMDA1NmY3YTM0NWRhMjljOWUyNTMzODE5In0.eyJhdWQiOiIxIiwianRpIjoiZTdiZDA5OGFjMDBjNmZlNmFiMWJlZGU0MWQ1YzRlYWJjNDQ0ZTZjNTQ1ZWE5Y2FjZGFlYjI5OWEwMDU2ZjdhMzQ1ZGEyOWM5ZTI1MzM4MTkiLCJpYXQiOjE1NjY4MjU5OTksIm5iZiI6MTU2NjgyNTk5OSwiZXhwIjoxNjE4NjY1OTk5LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.A2-x_S_TSuFjigSpD8_kdFzlfClyTFSh8XxQ_ZNtZYhOgzo6hIPiJZAOcVaoomJ53cryPlZi5FWrqfArPC-3U6YW4MTvDrNbdZUlQltH9ejMzhWDz-lBW87xQShUY-JgrDrPiA2NI-LAgIydSQwaUXE2mLPrIYfmIX5QDCd2--PWJ_vkfto3AHg8xH7nzy8AEfR4ucjNPaAGZKcOkvXHK7wtTcc9r3dBahTc4NDgQ13xGSkqk8e191r-zU63kQXBGH1nhlH6rbb79lA4_jaZV-cRfwht6nmdbxxQPi7tVbT0tqWELf7HgFu6UqA3wxNL13sXhcNsu4K7Tvix60oWELQbZ1-jsPBQKDHqZDgs9L2mh_HboCAOokfjbCNTrTnNnefotcUVHdBjLGKBAKk0BFEkIWy0O2HtihZ_AufsXk24dPOMBuWrEUJ-NHvEz9qDnOlG3VJ68JoXUUPd_L04qaNd2cuC2b_T5eZJvoHD2OYxjF2MYuVkyITiTv9C8ttsQz7v2Ynhwhpg-whE-qTfWnkOPIAGDFWDhmNXR_CNVqYvuu4kmArTm2YskmlI93G6MoTkt1DJM1dfZ8MiGR3Nk4dbvA4WgQe624Q3TJlqPKA7yB57IAlmcs6ADel3wObfmHEFtzOZKos6E1nwS3FSwBXzKqWd6KMX7QExMyAVHtM";

    $.ajax({
        method: "POST",
        url: "https://api.cenarioleads.net.br/api/leads",
        cache: false,
        sync: false,
        type: 'post',
        data: JSON.stringify(buildServicos('38')),
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            "Authorization": "Bearer " + tokenProd,
            'Access-Control-Allow-Origin': 'https://api.cenarioleads.net.br',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
        success: function(result) {
            console.log(result);
        },
        error: function(result) {
            console.log(result);
        }
    });
}

function GeraPreLeadEmail() {

    var tokenProd = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU3YmQwOThhYzAwYzZmZTZhYjFiZWRlNDFkNWM0ZWFiYzQ0NGU2YzU0NWVhOWNhY2RhZWIyOTlhMDA1NmY3YTM0NWRhMjljOWUyNTMzODE5In0.eyJhdWQiOiIxIiwianRpIjoiZTdiZDA5OGFjMDBjNmZlNmFiMWJlZGU0MWQ1YzRlYWJjNDQ0ZTZjNTQ1ZWE5Y2FjZGFlYjI5OWEwMDU2ZjdhMzQ1ZGEyOWM5ZTI1MzM4MTkiLCJpYXQiOjE1NjY4MjU5OTksIm5iZiI6MTU2NjgyNTk5OSwiZXhwIjoxNjE4NjY1OTk5LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.A2-x_S_TSuFjigSpD8_kdFzlfClyTFSh8XxQ_ZNtZYhOgzo6hIPiJZAOcVaoomJ53cryPlZi5FWrqfArPC-3U6YW4MTvDrNbdZUlQltH9ejMzhWDz-lBW87xQShUY-JgrDrPiA2NI-LAgIydSQwaUXE2mLPrIYfmIX5QDCd2--PWJ_vkfto3AHg8xH7nzy8AEfR4ucjNPaAGZKcOkvXHK7wtTcc9r3dBahTc4NDgQ13xGSkqk8e191r-zU63kQXBGH1nhlH6rbb79lA4_jaZV-cRfwht6nmdbxxQPi7tVbT0tqWELf7HgFu6UqA3wxNL13sXhcNsu4K7Tvix60oWELQbZ1-jsPBQKDHqZDgs9L2mh_HboCAOokfjbCNTrTnNnefotcUVHdBjLGKBAKk0BFEkIWy0O2HtihZ_AufsXk24dPOMBuWrEUJ-NHvEz9qDnOlG3VJ68JoXUUPd_L04qaNd2cuC2b_T5eZJvoHD2OYxjF2MYuVkyITiTv9C8ttsQz7v2Ynhwhpg-whE-qTfWnkOPIAGDFWDhmNXR_CNVqYvuu4kmArTm2YskmlI93G6MoTkt1DJM1dfZ8MiGR3Nk4dbvA4WgQe624Q3TJlqPKA7yB57IAlmcs6ADel3wObfmHEFtzOZKos6E1nwS3FSwBXzKqWd6KMX7QExMyAVHtM";
    $.ajax({
        method: "POST",
        url: "https://api.cenarioleads.net.br/api/leads",
        cache: false,
        sync: false,
        type: 'post',
        data: JSON.stringify(buildServicos('40')),
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            "Authorization": "Bearer " + tokenProd,
            'Access-Control-Allow-Origin': 'https://api.cenarioleads.net.br',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
        success: function(result) {


            return 0;
        },
        error: function(result) {


            return 0;
        }
    });
}


var validationCls = new ValidationEvent();

$(".input-validation").on('keyup change', function() { validationCls.validationKeyUp(this); })
$(".input-validation").on('change focusout', function() { validationCls.validationBlur(this, $(this).attr('validation-tooltip-errortext')) });
var contErro = 0;





//STEP2
$(".enviardados").click(function(e) {
    e.preventDefault();

    var contErro = 0;
    var restricao_text = '';
    var restricao_number = '';

    if ($('#restricao-nao').is(':checked')) {
        $('#strPossuiRestricao').val('0');
        restricao_text = 'Não'
        restricao_number = 0;
    }
    if ($('#restricao-sim').is(':checked')) {
        $('#strPossuiRestricao').val('1');
        restricao_text = 'Sim'
        restricao_number = 1;
    }

    $(".input-validation").each(function() {
        validationCls.validationBlur($(this), $(this).attr('validation-tooltip-errortext'));
        if (!validationCls.validationBlur($(this), $(this).attr('validation-tooltip-errortext'))) {

            contErro++;
        }
    });

    if (contErro == 0) {

        // Geração Lead Emprestimo

        var params = window.location.search;

        var dataLead = {
            "valor_emprestimo": sessionStorage.getItem('fltValorEmprestimo'),
            "possui_restricao": restricao_text,
            "tipos_emprestimos": $('#strTipoEmprestimo :selected').text(),
            "tipos_ocupacao": $('#strTipoOcupacao :selected').text(),
            "nome": sessionStorage.getItem('strNome'),
            "email": sessionStorage.getItem('strEmail'),
            "phone": sessionStorage.getItem('strTelefone'),
            "cpf": getValue('strCpfCnpj'),
            "url": "https://seucreditoagora.com.br" + params,
            "step": 2
        };

        GeraLeadEmprestimo(dataLead);


        SaltarPixel();
        //console.log('DEPOIS DO PIXEL');
        //sessionStorage.clear();
        var random = Math.floor((Math.random() * 10000) + 1);
        var restricao = $('#strPossuiRestricao').val();
        var bitConcluido = 0;
        let parametro = ''
        if (obtemParametroUri("aff_sub")["aff_sub"])
            parametro = "?aff_sub=" + obtemParametroUri("aff_sub")["aff_sub"];
        else parametro = "?aff_sub=cenario";

        $.ajax({
            type: "Get",
            url: "/upload/json/regras.json?V=" + random,
            dataType: 'json',
            async: false,
            success: function(data) {
                $.each(data.regras, function(index, value) {
                    if (bitConcluido == 0) {

                        var tipo_emprestimo_regra = value['strTipoEmprestimo'].split(';');
                        var bit_passa_tipo_emprestimo = 0;
                        tipo_emprestimo_regra.forEach(function(valores) {
                            if ($('#strTipoEmprestimo').val() == valores) {
                                bit_passa_tipo_emprestimo = 1;
                            }
                        });

                        var tipo_ocupacao_regra = value['strTipoOcupacao'].split(';');
                        var bit_passa_tipo_ocupacao = 0;
                        tipo_ocupacao_regra.forEach(function(valores) {
                            if ($('#strTipoOcupacao').val() == valores) {
                                bit_passa_tipo_ocupacao = 1;
                            }
                        })

                        if (bit_passa_tipo_emprestimo == 1 && bit_passa_tipo_ocupacao == 1) {
                            if (value['intRestricao'].indexOf(restricao) >= 0) {
                                if (value['strAcao'].toLowerCase() == 'adsense') {

                                    bitConcluido = 1;
                                    // scrollToAnchor('Conteudos-Ancoragem');

                                    setTimeout(function() {
                                        location.href = 'https://seucreditoagora.com.br/emprestimo-sem-parceiro' + parametro;
                                    }, 1000);
                                    return 0;
                                } else if (value['strAcao'].toLowerCase() == 'form') {


                                    // scrollToAnchor('Conteudos-Ancoragem');
                                    $("#passo1").addClass("hide");
                                    $("#passo2").removeClass("hide");
                                    bitConcluido = 1;
                                    return 0;
                                } else {


                                    // scrollToAnchor('Conteudos-Ancoragem');
                                    bitConcluido = 1;
                                    //$("#conteudo").addClass("d-none");
                                    //$("#agradecimento").removeClass("d-none");
                                    if (value['strAcao'].indexOf('?') < 0) {
                                        parametro = parametro.replace('?', '&');
                                    }
                                    var url = value['strAcao'] + parametro
                                    sessionStorage.setItem('x-url', url);
                                    novaAba('/emprestimo-com-parceiro' + parametro, '/agradecimento' + parametro);
                                }
                            }

                        }
                    }
                });
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

});


var teste = 0
if (obtemParametroUri('teste')['teste'] == 1) {
    teste = 1
}


function scrollTo(id) {
    // alturadatela = 200;
    // altura = $(id).offset().top - alturadatela;
    // $('html,body').animate({
    //     scrollTop: altura
    // }, 1000);

}


function buildServicos(idServico) {
    var dataUsuario = {
        'strEmail': getValue('strEmail'),
        'strNome': getValue('strNome'),
        'rIdCidades': getValue('rIdCidades'),
        'datNascimento': getValue('datNascimento'),
        'bitCnpj': '0',
        'strCpfCnpj': getValue('strCpfCnpj'),
        'strCep': getValue('strCep'),
        'strSexo': getValue('strSexo'),
        'rIdProfissoes': '0',
        'strOutraProfissao': getValue('strOutraProfissao'),
        'strTelefone': getValue('strTelefone'),
        'strTelefone2': getValue('strTelefoneSecundario'),
        'strTelefone3': getValue('strTelefone3'),
        'bitTermos': getValue('checkTermos'),
        'strMetodoContato': getValue('strMetodoContato')
    }
    switch (idServico) {
        // ConsorcioVeiculos
        case '1':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'strCarro': getValue('strCarro'),
                    'fltValorCarta': getValue('fltValorCarta'),
                    'strMarca': getValue('strMarca'),
                    'strModelo': getValue('strModelo'),
                    'fltValorParcela': getValue(''),
                    'intAnoModelo': getValue('fltValorParcela'),
                    'intQuantidadeParcelas': getValue('intQuantidadeParcelas')
                }
            }
            return dataLead
                // ConsorcioImoveis
        case '2':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'fltValorCarta': getValue('fltValorCarta'),
                    'intQuantidadeParcelas': getValue('intQuantidadeParcelas'),
                    'fltValorParcela': getValue('fltValorParcela'),
                    'strUtilizarFgts': getValue('strUtilizarFgts')
                }
            }
            return dataLead
                // SeguroVeiculos
        case '3':
            var dataLead = {
                'bitTeste': teste,
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'rIdSeguroVeiculosTiposApolice': getValue('rIdSeguroVeiculosTiposApolice'),
                    'strFabricante': getValue('strFabricante'),
                    'strModelo': getValue('strModelo'),
                    'strTipoVeiculo': getValue('strTipoVeiculo'),
                    'strJaPossuiVeiculo': getValue('strJaPossuiVeiculo'),
                    'codTabelaFipe': getValue('codTabelaFipe'),
                    'strCombustivel': getValue('strCombustivel'),
                    'strZeroKm': getValue('strZeroKm'),
                    'strUsoVeiculo': getValue('strUsoVeiculo'),
                    'strAntiFurto': getValue('strAntiFurto'),
                    'strPlaca': getValue('strPlaca'),
                    'strChassi': getValue('strChassi'),
                    'strFinanciado': getValue('strFinanciado'),
                    'strPrincipalCondutor': getValue('strPrincipalCondutor'),
                    'strGaragem': getValue('strGaragem'),
                    'strQuilometragem': getValue('strQuilometragem'),
                    'strObservacao': getValue('strObservacao'),
                    'intAnoModelo': getValue('intAnoModelo')
                }
            }
            return dataLead
                // SeguroVida
        case '4':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'intNumeroVidas': getValue('intNumeroVidas')
                }
            }
            return dataLead
                // SeguroViagem
        case '5':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'rIdSeguroViagemTurismoDestinos': getValue('rIdSeguroViagemTurismoDestinos'),
                    'datIda': getValue('datIda'),
                    'datVolta': getValue('datVolta'),
                    'intQuantidadeViajantes': getValue('intQuantidadeViajantes')
                }
            }
            return dataLead
                // PlanoSaudeEmpresarial
        case '6':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'intNumeroPessoas': getValue('intNumeroPessoas'),
                    'strOperadora': getValue('strOperadora')
                }
            }
            return dataLead
                // PlanoSaudeFamiliar
        case '7':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'intNumeroPessoas': getValue('intNumeroPessoas'),
                    'strOperadora': getValue('strOperadora')
                }
            }
            return dataLead
                // PlanoSaudeIndividual
        case '8':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'intNumeroPessoas': getValue('intNumeroPessoas'),
                    'strOperadora': getValue('strOperadora')
                }
            }
            return dataLead
                // FinanciamentoVeiculos
        case '9':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'strTipoFinanciamento': getValue('strTipoFinanciamento'),
                    'strMarca': getValue('strMarca'),
                    'strModelo': getValue('strModelo'),
                    'fltValorVeiculo': getValue('fltValorVeiculo'),
                    'fltValorFinanciar': getValue('fltValorFinanciar'),
                    'intQuantidadeParcelas': getValue('intQuantidadeParcelas'),
                    'intAnoModelo': getValue('intAnoModelo')
                }
            }
            return dataLead
                // PlanoOdontologico
        case '14':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'intNumeroPessoas': getValue('intNumeroPessoas')
                }
            }
            return dataLead
                // TelefoniaPME
        case '15':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'strEmpresa': getValue('strEmpresa'),
                    'strInteresse': getValue('strInteresse'),
                    'strQuantidadeLinhas': getValue('strQuantidadeLinhas'),
                    'strPlanoCorporativo': getValue('strPlanoCorporativo'),
                    'strObservacoes': getValue('strObservacoes'),
                    'strOperadoraInteresse': getValue('strOperadoraInteresse')
                }
            }
            return dataLead
                // RefinanciamentoImovel
        case '17':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'fltValorImovel': getValue('fltValorImovel'),
                    'fltValorCredito': getValue('fltValorCredito')
                }
            }
            return dataLead
                // Educacao
        case '19':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'strCursoInteresse': getValue('strCursoInteresse'),
                    'strNivelEscolaridade': getValue('strNivelEscolaridade')
                }
            }
            return dataLead
                // Rastreador
        case '21':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'strTipoAutomovel': getValue('strTipoAutomovel'),
                    'strPlaca': getValue('strPlaca'),
                    'intAno': getValue('intAno'),
                    'strMarca': getValue('strMarca'),
                    'strModelo': getValue('strModelo')
                }
            }
            return dataLead
                // EmprestimoPessoal
        case '29':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'fltQuantoPrecisa': getValue('fltQuantoPrecisa'),
                    'intPagarQuantoTempo': getValue('intPagarQuantoTempo'),
                    'strMotivoEmprestimo': getValue('strMotivoEmprestimo')
                }
            }
            return dataLead
                // Net
        case '34':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'strQuerNetPara': getValue('strQuerNetPara'),
                    'bitSemProdutosClaro': getValue('bitSemProdutosClaro'),
                    'bitTemClaroFixo': getValue('bitTemClaroFixo'),
                    'bitTemClaroInternetCasa': getValue('bitTemClaroInternetCasa'),
                    'bitTemClaroCelular': getValue('bitTemClaroCelular'),
                    'bitTemClaroTv': getValue('bitTemClaroTv'),
                    'bitReceberSmsEmail': getValue('bitReceberSmsEmail')
                }
            }
            return dataLead
                // CartaoBeneficio
        case '35':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'strNomeEmpresa': getValue('strNomeEmpresa'),
                    'strNumeroComercial': getValue('strNumeroComercial')
                }
            }
            return dataLead
                // ConsorcioMotos
        case '36':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'strMarca': getValue('strMarca'),
                    'strModelo': getValue('strModelo'),
                    'fltValorCarta': getValue('fltValorCarta'),
                    'fltValorParcela': getValue('fltValorParcela'),
                    'intQuantidadeParcelas': getValue('intQuantidadeParcelas'),
                    'intAnoModelo': getValue('intAnoModelo')
                }
            }
            return dataLead
                // ConsorcioServicos
        case '37':
            var dataLead = {
                'bitTeste': obtemParametroUri('teste')['teste'],
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'strServico': getValue('strServico'),
                    'fltValorCarta': getValue('fltValorCarta'),
                    'fltValorParcela': getValue('fltValorParcela'),
                    'intQuantidadeParcelas': getValue('intQuantidadeParcelas')
                }
            }
            return dataLead
                //LeadPreEmprestimo
        case '38':


            var QuantoPrecisa = getValue('fltValorEmprestimo');
            var TempoPagar = $('#strTipoEmprestimo :selected').text();

            var dataLead = {
                'bitTeste': teste,
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'strPossuiRestricao': getValue('strPossuiRestricao'),
                    'fltQuantoPrecisa': QuantoPrecisa,
                    'fltQuantoTempo': TempoPagar,
                    'strTelefone': getValue('strTelefone')
                }
            }
            return dataLead
                //LeadPreCoteCompare
        case '39':
            var dataLead = {
                'bitTeste': teste,
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'strNome': getValue('strNome'),
                    'strEmail': getValue('strEmail'),
                    'strTelefone': getValue('strTelefone'),
                    'strUri': getValue('strUri'),
                    'strTipoConsulta': getValue('strTipoConsulta'),
                    'strRestricao': getValue('strRestricao'),
                    'strTipoEmprestimo': $('#strTipoEmprestimo :selected').text()
                }
            }
            return dataLead
        case '40':
            var dataLead = {
                'bitTeste': teste,
                'rIdServicos': '39',
                dataUsuario,
                'dataLead': {
                    'strNome': getValue('strNome'),
                    'strEmail': getValue('strEmail'),
                    'strTelefone': getValue('strTelefone'),
                    'strUri': getValue('strUriPre'),
                    'strTipoConsulta': getValue('strTipoConsulta'),
                    'strRestricao': getValue('strPossuiRestricao'),
                    'bitTermos': '1',
                    'strNavegador': getValue('strNavegador'),
                    'strTipoEmprestimo': $('#strTipoEmprestimo :selected').text(),
                    'strValorEmprestimo': getValue('fltValorEmprestimo'),
                    'strPossuiVeiculo': getValue('strPossuiVeiculoRedirect'),
                    'strPossuiImovel': getValue('strPossuiImovelRedirect'),
                    'strCpfCnpj': getValue('strCpfCnpjRedirect'),
                    'strOcupacao': $('#strOcupacaoLendicoRedirect :selected').text(),
                    'rIdParceiro': $('#rIdParceiro').val(),
                    'strNomeParceiroCoteCompare': $('#strNomeParceiro').val(),
                    'strBanco': $('#strBancoPre').val()
                }
            }
            return dataLead
                //LeadsEmprestimoConsignado
        case '42':
            var beneficio = getValue('strValorBeneficio');
            var QuantoPrecisa = getValue('valorPv');
            if (beneficio == '1') {
                beneficio = 'R$ 1045,00';
            } else if (beneficio == '2') {
                beneficio = 'R$ 1500,00';
            } else if (beneficio == '3') {
                beneficio = 'R$ 2300,00'
            }

            var dataLead = {
                'bitTeste': teste,
                'rIdServicos': idServico,
                dataUsuario,
                'dataLead': {
                    'fltValorEmprestimo': QuantoPrecisa,
                    'fltRendaMensal': getValue('strRendaMensal'),
                    'strOndeRecebe': getValue('strBeneficio'),
                    'fltValorMensalBeneficio': beneficio
                }
            }
            return dataLead
    }
}

function getValue(field) {
    if (field == 'checkTermos') {
        if ($('#' + field).prop('checked') == true) {
            return 1
        } else {
            return 0
        }
    } else {
        if ($('#' + field).val() == undefined) {
            return ''
        } else {
            return $('#' + field).val()
        }
    }
}
