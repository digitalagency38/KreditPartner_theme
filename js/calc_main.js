$(document).on('af_complete', function(event, response) {
    var form = response.form;
    if (response.success) {
        form.parents('.modal').modal('hide');
        $('#modalOtziv .modal-body').html(response.message);
        $('#modalOtziv').modal('hide');
    }
});

$(document).ready(function() {
	function theEnd(num) {
        if (num == 1) return num+' месяц';
        if (num == 2 || num == 3 || num == 4) return num+' месяца';
        return num+' месяцев';
    }
	/****************************экспресс*****************************************************/
    //$(function() {
    function initTypeExpress() {
        const type = $("#express_tarif").val();
        const minSum = window.expressTarifs[type].minSum, maxSum = window.expressTarifs[type].maxSum, minTime = window.expressTarifs[type].minTime, maxTime = window.expressTarifs[type].maxTime;
        //const { minSum, maxSum, minTime, maxTime } = window.expressTarifs[type];
        
        //console.log(minSum, maxSum);
        $("#standart_sum_slider").slider({
                range: "min",
                value: Math.floor((maxSum + minSum)/2)*1000,
                min: minSum*1000,
                max: maxSum*1000,
                step: 1000,
                slide: function(event, ui) {
                    $("#standart_calc_sum").val(ui.value).trigger("change");
                }
            });
        
        $("#standart_calc_sum").val($("#standart_sum_slider").slider("value"));
        $("#standart_period_slider").slider({
            range: "min",
            value: 12,
            min: minTime,
            max: maxTime,
            step: 1,
            slide: function(event, ui) {
                $("#standart_calc_period").val(ui.value).trigger("change");
                
            }
        });
        $("#standart_calc_period").val($("#standart_period_slider").slider("value"));
    //});
    }
    if ($("#express_tarif").val()) initTypeExpress();
    
    $(function() {
        
        var result = 11540,
        sum = 10000,
        timelimit = 12,
        now_date = new Date(),
        day = now_date.getDate(),
        month = now_date.getMonth(),
        year = now_date.getFullYear(),
        back_date = new Date(year,month,day+timelimit),
        result_outptut = $("#standart_response span"),
        time_outptut = $("#standart_timeout span"),
        options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        };
        if ($("#express_tarif").val()) recount();
        //console.log( now_date.toLocaleString("ru", options));
        
        function recount() {
            //sum_back = ( (sum/timelimit) * 0.6 + (sum/timelimit) ) * timelimit;
            /*now_date = new Date();
            day = now_date.getDate();
            month = now_date.getMonth();
            year = now_date.getFullYear();
            back_date = new Date(year,month,day+timelimit*1);
            
            console.log("now_date = " + now_date.toLocaleString("ru", options));
            console.log("day = "+day+"; month = "+month+"; year = "+year+"; timelimit = "+timelimit+"; timelimit+day = "+(timelimit+day));
            console.log("back_date = " + back_date.toLocaleString("ru", options));*/
            //5000+((5000*0,6%)*10)=5300
            //sum_back = sum + ((sum*0.6)*timelimit*1);
            const type = $("#express_tarif").val();
            const { percent } = window.expressTarifs[type];
            
            sum_back = sum*1 +(((sum/1)/100) * (timelimit*1*percent));
            
            back_date = new Date(year,month,day+timelimit*1),
            result_outptut.html(sum_back + ' руб.');
            time_outptut.html(back_date.toLocaleString("ru", options));
            
            $('#modal_main_sumback').val(sum_back);
            $('#modal_main_sum').val(sum);
            $('#modal_main_timelimit').val(timelimit);
            
        }
        $(document).on("change", "#express_tarif", function() {
            initTypeExpress();
            recount();
        });
        
        $(document).on("change keyup", "#standart_calc_sum", function() {
            sum = $(this).val();
           // console.log('sum = '+sum);
            recount();
        });
        $(document).on("change keyup", "#standart_calc_period", function() {
            timelimit = $(this).val();
        //    console.log('timelimit = '+timelimit);
            recount();
        });
        
    });	
	/*********************************************************************************/
	//                         Слайдеры

/****************************потреб*****************************************************/

	function getTarifName(value) {
	    const obj = {
            1: 'Doctor',// Кредитный доктор
            2: 'ZalogNedv',//Залоговый Недвижимость
            3: 'Pension plus',//Пенсионный плюс
            4: 'Comfort',//Комфортный
            5: 'Classic',//Классический
            6: 'ZalogTrans',//Залоговый ТС
            7: 'Refinancing',//Рефинансирование
            8: 'Aid',//Взаимный
            9: 'Aid plus',//Доверительный плюс
            10: 'Family',//На развитие бизнеса Семейный
            11: 'Optimal', //Оптимальный
            12: 'Avtozaim',// Автозайм
            13: 'Srochniy',// Срочный
        };
        return obj.hasOwnProperty(value) ? obj[value] : 'other';
	}
	
    //var persent_now = Number($('#tv_potreb_optimal1').text().replace(/\D+/g,"")); // ввод процента из тикета (если понадобится, сейчас не используется)
    
    // Процедура связки со слайдером
    function initTypePotreb() {
        let tarifName = getTarifName($('#potreb_tarif').val());
        const { minSum, maxSum, timeMax: maxMonth, timeMin: minMonth } = window.loanTarifs[tarifName];
        $("#potreb_sum_slider").slider({
                        range: "min",
                        value: 50,
                        min: minSum,
                        //min: 1,
                        max: maxSum,
                        //max: 100,
                        step: 1,
                        slide: function(event, ui) {
                            $("#potreb_calc_sum").val(ui.value).trigger("change");
                        }
        });
                    
        $("#potreb_calc_sum").val($("#potreb_sum_slider").slider("value"));
                    
        $("#potreb_period_slider").slider({
                        range: "min",
                        value: 4,
                        min: minMonth, //2022.10.07 добавил
                        max: maxMonth,
                        step: 1,
                        slide: function(event, ui) {
                            $("#potreb_calc_period").val(ui.value).trigger("change");
                        }
                    });
        $("#potreb_calc_period").val($("#potreb_period_slider").slider("value"));  
     
    }
    
    // Инициализация связки по выбранному займу
    if ($('#potreb_tarif').val()) initTypePotreb();
    
    
    // старая Формула для сложного расчета двойных процентов на сумму и остаток займа - Цыбанов
    function sumir(m, p) {
        ss = 0;
        for (let k = 1 ; k < m+1; k++) {
            ss = ss + (Math.pow(((p/1200)+1), k-1));
        }
        return ss;
    }
    
    function dsumost(m) {
        ss = 0;
        for (let k = 1 ; k < m+1; k++) {
            ss = ss + (1-((k-1)/m));
        }
        return ss;
    }


    /*Основное тело*/
    $(function() {
        
        // данные-переменные с первичным присвоением значений
        var sum = 10000,
        timelimit = 3,
        now_date = new Date(),
        day = now_date.getDate(),
        month = now_date.getMonth(),
        year = now_date.getFullYear(),
        back_date = new Date(year,month+timelimit,day),
        result_outptut_in = $("#potreb_response_in span"),
        time_outptut = $("#potreb_timeout span"),
        options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        };
        
        if ($('#potreb_tarif').val()) recount();
        
        
        // Процедура перерасчета в связке с изменениями на слайдере
        function recount() {
            // Ввод констант
            const tarifName = getTarifName($('#potreb_tarif').val()); // связка с выбранным займом
            const s = sum / 1000; // связка шага в шкале суммы в слайде и реальной суммы
            const toTime = window.loanTarifs[tarifName].toTime; // приоритет по периоду или сумме
            const segment = window.loanTarifs[tarifName].segments.find(seg => {
                if (toTime){
                    return timelimit >= seg.minTime && timelimit <= seg.maxTime;
                } else {
                    return s >= seg.minSum && s <= seg.maxSum;
                } 
                //return timelimit >= seg.minTime && timelimit <= seg.maxTime && s >= seg.minSum && s <= seg.maxSum;
            }); // связка с сегментом из чанка
            
            // расчеты в сегменте
            if (segment) {
                console.log(segment.percent);
                
                // связка на корректность слайдера и сегментов по чанку
                const currentTime = $('#potreb_calc_period').val();
                if (!toTime){
                    $('#potreb_period_slider').slider({max: segment.maxTime, min: segment.minTime});
                }
                if (toTime){
                    $('#potreb_sum_slider').slider({max: segment.maxSum, min: segment.minSum});
                }
                
                if (currentTime < segment.minTime) {
                    $('#potreb_calc_period').val(segment.minTime);
                    //$('#potreb_period_slider').slider('value', segment.minTime); //2022.10.07 добавлено по примеру как ниже

                } else if (currentTime > segment.maxTime) {
                    $('#potreb_calc_period').val(segment.maxTime);
                    $('#potreb_period_slider').slider('value', segment.maxTime);
                }
                
                if (s < segment.minSum) {
                    $('#potreb_calc_sum').val(segment.minSum);
                    //$('#potreb_sum_slider').slider('value', segment.minSum); //2022.10.07 добавлено по примеру как ниже

                } else if (s > segment.maxSum) {
                    $('#potreb_calc_sum').val(segment.maxSum);
                    $('#potreb_sum_slider').slider('value', segment.maxSum);
                }
                
                
                // процент - старая переменная - не используется
                persent_now = segment.percent;
                
                // Новые переменные из чанка percents - Цыбанов
                perSum = segment.percentSum; // процент на сумму
                perOst = segment.percentOst; // процент на остаток
                perEdin = segment.percentEdin; // единовременный ДЧВ
                
                // Общий (окончательный) подсчет - Цыбанов
                if(timelimit > segment.maxTime){
                    // при превышении максимального периода - корректировка при переходах на слайдере
                    timelimit = segment.maxTime;
                    result = Math.floor(((sum*(perOst/1200))*dsumost(Number(timelimit))) + ((Number(timelimit)*sum)*(perSum/1200)) + (sum*(perEdin/100)) + sum);
                    //result = Math.floor((sum*(perEdin/100))+(sum*Math.pow((1+(perOst/1200)), Number(timelimit)))+(((sum*perSum)/1200)*sumir(Number(timelimit), perOst))); // С накоплением процентов, график одинаковой суммой
                } else if (timelimit < segment.minTime) {
                    // при недостачи до минимального периода - корректировка при переходах на слайдере
                    timelimit = segment.minTime;
                    result = Math.floor(((sum*(perOst/1200))*dsumost(Number(timelimit))) + ((Number(timelimit)*sum)*(perSum/1200)) + (sum*(perEdin/100)) + sum);
                    //result = Math.floor((sum*(perEdin/100))+(sum*Math.pow((1+(perOst/1200)), Number(timelimit)))+(((sum*perSum)/1200)*sumir(Number(timelimit), perOst)));
                } else {
                    // без корректировок - норма
                    result = Math.floor(((sum*(perOst/1200))*dsumost(Number(timelimit))) + ((Number(timelimit)*sum)*(perSum/1200)) + (sum*(perEdin/100)) + sum);
                    //result = Math.floor((sum*(perEdin/100))+(sum*Math.pow((1+(perOst/1200)), Number(timelimit)))+(((sum*perSum)/1200)*sumir(Number(timelimit), perOst)));
                }
            }
            
            timelimit = $('#potreb_calc_period').val();
            back_date = new Date(year,month+timelimit*1,day);

            result_outptut_in.html(result+" ₽");
            time_outptut.html(back_date.toLocaleString("ru", options));
            
            $('#modal_main_type_potreb').val('Оптимальный '+$('#potreb_tarif').val());
            $('#modal_main_sumback_potreb').val(result);
            $('#modal_main_sum_potreb').val(sum);
            $('#modal_main_timelimit_potreb').val(timelimit);
        }
        
        // Активация пересчета при действиях на слайдере калькулятора
        $(document).on("change", "#potreb_tarif", function() {
            initTypePotreb();
            sum = $("#potreb_calc_sum").val() * 1000;
            recount();
        });
        $(document).on("change keyup", "#potreb_calc_sum", function() {
            sum = $(this).val()*1000;
            recount();
        });
        $(document).on("change keyup", "#potreb_calc_period", function() {
            timelimit = $(this).val();
            recount();
        });
        
    });	
/*********************************************************************************/
	
		/****************************сбережения*******http://paste2.org/v3FzXUEX**********************************************/
    initTypeSber();
    
    function persentCalc(period, typeSber) {
        var procent;
        switch (typeSber) {
            case 'standart': // Стандартный
                (period >= 12 && period <= 24) ? procent = 6.5 : procent = 7.5; //
               // console.log('--------'+procent); Number($('#tv_sber_standart').text().replace(/\D+/g,"").substr(0,2))/100    Number($('#tv_sber_standart').text().replace(/\D+/g,"").substr(2,4))/10
                break;
            case 'pension': // Пенсионный
                //console.log(parseFloat($('#tv_sber_pension').text().match(/-?\d+(\.\d+)?/gm)));
                (period >= 12 && period <= 24) ? procent = 8 : procent = 9;
                //(period >= 12 && period <= 24) ? procent = parseFloat($('#tv_sber_pension').text().replace(/[^0-9.]/g,'').substr(0,2))/10 : procent = parseFloat($('#tv_sber_pension').text().replace(/[^0-9.]/g,'').substr(2,6))/10;
//                (period >= 12 && period <= 24) ? procent = Number($('#tv_sber_pension').text().replace(/[^0-9.]/g,'').substr(0,2)) : procent = Number($('#tv_sber_pension').text().replace(/[^0-9.]/g,'').substr(2,6));
                break;
            case 'accumulative': // Накопительный
                (period == 12) ? procent = 6.5 : procent = 7.5;
                //(period == 12) ? procent = parseFloat($('#tv_sber_save').text().replace(/[^0-9.]/g,'').substr(0,2))/10 : procent = parseFloat($('#tv_sber_save').text().replace(/[^0-9.]/g,'').substr(2,6))/10;
                break;
            case 'urgent': // Срочный
                (period == 3) ? procent = 6 : procent = 6;
                //(period == 3) ? procent = parseFloat($('#tv_sber_urgent').text().replace(/\D+/g,"").substr(0,2)) : procent = parseFloat($('#tv_sber_urgent').text().replace(/\D+/g,"").substr(0,2));
                break;
            case 'convinient': // Удобный
                if (period >= 1) procent = 6.5;
                // if (period >= 1) procent = Number($('#tv_sber_convinient').text().replace(/\D+/g,"").substr(0,2))/10;
                break; 
            case 'help': // Взаимопомощь VIP
                if (period >= 1) procent = 13;
                // if (period >= 1) procent = Number($('#tv_sber_help').text().split(',').join('.').replace(/[^\d.]+/ig,"").substr(0,4));
                break;
            case 'loyal': // Лояльный
                if (period >= 1) procent = Number($('#tv_sber_loyal').text().replace(/\D+/g,"").substr(0,2));
                break; 
            case 'kopilka': // Копилка
                if (period >= 1) procent = 8;
                break;
            case 'cooperativ': // Кооперативный
                if (period >= 1) procent = 11;
                break;
        }
        //console.log('procent = '+procent);
        return procent;
    }
    //console.log(Number($('#tv_sber_standart').text().replace(/\D+/g,"").substr(2,4)));
    

    function beetween_days( date1, date2 ) {
      var one_day=1000*60*60*24;
    
      var date1_ms = date1.getTime();
      var date2_ms = date2.getTime();
    
      var difference_ms = date2_ms - date1_ms;
        
      return Math.round(difference_ms/one_day); 
    }
    
    $(function() {
        
        var result_outptut_in = $("#sber_response_in span"),
        result_outptut_out = $("#sber_response_out span"),
        time_outptut = $("#sber_timeout span"),
        sber_state = $('#sber_state span'), //p
        sber_period = $('#sber_calc_period'), //N
        sber_type = $('#sber_tarif'),
        calc_sum = $('#sber_calc_sum'), //K
        tarif = 1, 
        result,
        sum = 10000,
        timelimit = sber_period.val(),
        now_date = new Date(),
        day = now_date.getDate(),
        month = now_date.getMonth(),
        year = now_date.getFullYear(),
        back_date = new Date(year, month+timelimit*1, day), 
        options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };
        
        recount();
        /*console.log('now_date = '+ now_date.toLocaleString("ru", options));
        console.log('back_date = '+ back_date.toLocaleString("ru", options));
        console.log(amount_days);*/
        
        function recount() {
            var res;
            var mDateStart = moment();
            var mDateEnd = mDateStart.clone().add(timelimit,'months');
            var mDiff = mDateEnd.diff(mDateStart, 'days');
 
            amount_days = beetween_days(now_date, back_date); //получили количество дней
  
            persent_state = persentCalc(sber_period.val(), sber_type.val());  //получили процентную ставку p
            //console.log(mDiff);
            income_man = Math.floor(calc_sum.val() * (persent_state/100) * mDiff / 365);//!!!доход у учет месяцев Доход пайщика = 100000 * 16% * 183 / 365 = 8021 K*p
            non_taxable = Math.floor(calc_sum.val()/100 * 13.5 * timelimit / 12);
            tax_state = persent_state - (window.percentRate+5);
            // console.log('ставка налога: ',tax_state);
            let income_clear;
            if (tax_state > 0) {
                income_clear = income_man - calc_sum.val()*tax_state/12*timelimit/100*0.35;
            } else {
                income_clear = income_man;
            }
            // taxable = income_man - non_taxable; //Облагаемый доход = 8021 – 7771 = 250
            // tax_state = Math.floor(taxable/100*35); //Налог по ставке 35% = 250 * 35 % = 87 
            // income_clear = Math.round(income_man - tax_state); //на руки
            // income_clear = Math.round(income_man); //!!! без вычитания
            
            result_outptut_in.html(calc_sum.val()+" ₽");
            time_outptut.html( theEnd( $('#sber_calc_period').val() ) );
            sber_state.html(persent_state+'%');
            if (($('#sber_tarif').val() == 'accumulative') || ($('#sber_tarif').val() == 'kopilka')) {
                result_outptut_out.html((calc_sum.val()*(Math.pow((1+persent_state/1200), sber_period.val()))).toFixed(2) +' руб.'); // S=K*q^N, q=1+p/12, для накопительного
            } else {
                res = calc_sum.val()*(persent_state/1200)*sber_period.val();
                res = Math.floor(calc_sum.val()) + res;
				result_outptut_out.html((res).toFixed(2) + ' ₽');

            }
            //console.log(calc_sum.val(), persent_state, sber_period.val())
            //result_outptut_out.html(income_clear+calc_sum.val()*1+' руб.'); //РЕЗУЛЬТАТ S=K*((1+p/12)^N)
            
            
            $('#modal_main_type_sber').val($('#sber_tarif').val());
            $('#modal_main_sumback_sber').val(income_clear+calc_sum.val()*1+' ₽');
            $('#modal_main_sum_sber').val(calc_sum.val());
            $('#modal_main_timelimit_sber').val(theEnd( $('#sber_calc_period').val() ));
            $('#modal_main_state_sber').val(persent_state+'%');
        }
        $(document).on("change", "#sber_tarif", function() {
            initTypeSber();
            recount();
        });
        $(document).on("change keyup", "#sber_calc_sum", function() {
            sum = $(this).val();
           // console.log('sum = '+sum);
            recount();
        });
        $(document).on("change keyup", "#sber_calc_period", function() {
            timelimit = $(this).val();
            //console.log('timelimit = '+timelimit);
            recount();
        });
        
    });	
	/*********************************************************************************/
	/*Расчет калькулятора по Сбережению

максимальная сумма - 1000 000 

% ставка - 18% годовых (либо в калькуляторе должна быть возможность выбора программы, исходя из этого проставляется % и срок)

срок - 6, 12 мес. (возможность выбора срока или 6 мес или 12 мес) 

Например, 
сумма сбережений  100 000 руб. по программе стандартный 
срок размещения –  . ( июнь, июль, август, сентябрь, октябрь, ноябрь - всего 183 дня). 
Ставка процента в данном случае составит 16%. 
НДФЛ с процентов по договору определяется по следующей схеме: 
Доход пайщика = 100000 * 16% * 183 / 365 = 8021 
Необлагаемая сумма = 100000 * 15,5% * 183 / 365 = 7771 
Облагаемый доход = 8021 – 7771 = 250 
Налог по ставке 35% = 250 * 35 % = 87 
На руки  8021 - 87 = 7934 руб.*/
    function initTypeSber() {
        
        if ($('#sber_tarif').val() == 'standart') { // Стандартный
            $("#sber_sum_slider").slider({
                range: "min",
                value: 100000,
                min: 5000,
                max: 1000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_sum").val($("#sber_sum_slider").slider("value"));
            
            $("#sber_period_slider").slider({
                range: "min",
                value: 12,
                min: 12,
                max: 48,
                step: 1, 
                slide: function(event, ui) {
                    $("#sber_calc_period").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period").val($("#sber_period_slider").slider("value"));                    
        }

        if ($('#sber_tarif').val() == 'pension') { // Пенсионный
            $("#sber_sum_slider").slider({
                range: "min",
                value: 100000,
                min: 1000,
                max: 1000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum").val($("#sber_sum_slider").slider("value"));
            
            $("#sber_period_slider").slider({
                range: "min",
                value: 12,
                min: 12,
                max: 48,
                step: 1,
                slide: function(event, ui) {
                    $("#sber_calc_period").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period").val($("#sber_period_slider").slider("value"));     
        }
        
        if ($('#sber_tarif').val() == 'accumulative') { // Накопительный
            $("#sber_sum_slider").slider({
                range: "min",
                value: 100000,
                min: 5000,
                max: 1000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum").val($("#sber_sum_slider").slider("value"));
            
            $("#sber_period_slider").slider({
                range: "min",
                value: 12,
                min: 12,
                max: 24,
                step: 12,
                slide: function(event, ui) {
                    $("#sber_calc_period").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period").val($("#sber_period_slider").slider("value"));     
        }       
        
        if ($('#sber_tarif').val() == 'urgent') { // Срочный
            $("#sber_sum_slider").slider({
                range: "min",
                value: 100000,
                min: 5000,
                max: 1000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum").val($("#sber_sum_slider").slider("value"));
            
            $("#sber_period_slider").slider({
                range: "min",
                value: 6,
                min: 6,
                max: 9,
                step: 3,
                slide: function(event, ui) {
                    $("#sber_calc_period").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period").val($("#sber_period_slider").slider("value"));     
        }
        
        if ($('#sber_tarif').val() == 'convinient') { // Удобный
            $("#sber_sum_slider").slider({
                range: "min",
                value: 100000,
                min: 5000,
                max: 1000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum").val($("#sber_sum_slider").slider("value"));
            
            $("#sber_period_slider").slider({
                range: "min",
                value: 12,
                min: 1,
                max: 48,
                step: 1,
                slide: function(event, ui) {
                    $("#sber_calc_period").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period").val($("#sber_period_slider").slider("value"));     
        }        
        
        if ($('#sber_tarif').val() == 'help') { // Взаимопомощь VIP
            $("#sber_sum_slider").slider({
                range: "min",
                value: 100000,
                min: 1000,
                max: 2000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum").val($("#sber_sum_slider").slider("value"));
            
            $("#sber_period_slider").slider({
                range: "min",
                value: 18,
                min: 18,
                max: 48,
                step: 1,
                slide: function(event, ui) {
                    $("#sber_calc_period").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period").val($("#sber_period_slider").slider("value"));     
        }
        
        if ($('#sber_tarif').val() == 'loyal') { // Лояльный
            $("#sber_sum_slider").slider({
                range: "min",
                value: 100000,
                min: 5000,
                max: 1000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum").val($("#sber_sum_slider").slider("value"));
            
            $("#sber_period_slider").slider({
                range: "min",
                value: 12,
                min: 1,
                max: 12,
                step: 1,
                slide: function(event, ui) {
                    $("#sber_calc_period").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period").val($("#sber_period_slider").slider("value"));     
        }             

        if ($('#sber_tarif').val() == 'kopilka') { // Копилка
            $("#sber_sum_slider").slider({
                range: "min",
                value: 100000,
                min: 5000,
                max: 2000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum").val($("#sber_sum_slider").slider("value"));
            
            $("#sber_period_slider").slider({
                range: "min",
                value: 12,
                min: 12,
                max: 48,
                step: 1,
                slide: function(event, ui) {
                    $("#sber_calc_period").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period").val($("#sber_period_slider").slider("value"));     
        }             

        if ($('#sber_tarif').val() == 'cooperativ') { // Кооперативный
            $("#sber_sum_slider").slider({
                range: "min",
                value: 100000,
                min: 5000,
                max: 1000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum").val($("#sber_sum_slider").slider("value"));
            
            $("#sber_period_slider").slider({
                range: "min",
                value: 12,
                min: 1,
                max: 36,
                step: 1,
                slide: function(event, ui) {
                    $("#sber_calc_period").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period").val($("#sber_period_slider").slider("value"));     
        }             
        
        /*=================================================*/
        
        if ($('#sber_tarif2').val() == 'standart') {
            $("#sber_sum_slider2").slider({
                range: "min",
                value: 100000,
                min: 5000,
                max: 1000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum2").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_sum2").val($("#sber_sum_slider2").slider("value"));
            
            $("#sber_period_slider2").slider({
                range: "min",
                value: 6,
                min: 6,
                max: 12,
                step: 6,
                slide: function(event, ui) {
                    $("#sber_calc_period2").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period2").val($("#sber_period_slider2").slider("value"));                    
        }

        if ($('#sber_tarif2').val() == 'pension') {
            $("#sber_sum_slider2").slider({
                range: "min",
                value: 10000,
                min: 5000,
                max: 500000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum2").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum2").val($("#sber_sum_slider2").slider("value"));
            
            $("#sber_period_slider2").slider({
                range: "min",
                value: 6,
                min: 6,
                max: 12,
                step: 6,
                slide: function(event, ui) {
                    $("#sber_calc_period2").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period2").val($("#sber_period_slider2").slider("value"));     
        }
        
        if ($('#sber_tarif2').val() == 'accumulative') {
            $("#sber_sum_slider2").slider({
                range: "min",
                value: 10000,
                min: 5000,
                max: 1000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum2").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum2").val($("#sber_sum_slider2").slider("value"));
            
            $("#sber_period_slider2").slider({
                range: "min",
                value: 6,
                min: 6,
                max: 12,
                step: 6,
                slide: function(event, ui) {
                    $("#sber_calc_period2").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period2").val($("#sber_period_slider2").slider("value"));     
        }       
        
        if ($('#sber_tarif2').val() == 'urgent') {
            $("#sber_sum_slider2").slider({
                range: "min",
                value: 10000,
                min: 5000,
                max: 1000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum2").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum2").val($("#sber_sum_slider2").slider("value"));
            
            $("#sber_period_slider2").slider({
                range: "min",
                value: 3,
                min: 3,
                max: 3,
                step: 3,
                slide: function(event, ui) {
                    $("#sber_calc_period2").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period2").val($("#sber_period_slider2").slider("value"));     
        }
        
        if ($('#sber_tarif2').val() == 'convinient') {
            $("#sber_sum_slider2").slider({
                range: "min",
                value: 10000,
                min: 5000,
                max: 1000000,
                step: 1000,
                slide: function(event, ui) {
                    $("#sber_calc_sum2").val(ui.value).trigger("change");
                }
            });
            $("#sber_calc_sum2").val($("#sber_sum_slider2").slider("value"));
            
            $("#sber_period_slider2").slider({
                range: "min",
                value: 12,
                min: 12,
                max: 12,
                step: 12,
                slide: function(event, ui) {
                    $("#sber_calc_period2").val(ui.value).trigger("change");
                    
                }
            });
            $("#sber_calc_period2").val($("#sber_period_slider2").slider("value"));     
        }        
        

    }
    
    $(function() {
        
        var result_outptut_in = $("#sber_response_in2 span"),
        result_outptut_out = $("#sber_response_out2 span"),
        time_outptut = $("#sber_timeout2 span"),
        sber_state = $('#sber_state2 span'),
        sber_period = $('#sber_calc_period2'),
        sber_type = $('#sber_tarif2'),
        calc_sum = $('#sber_calc_sum2'),
        tarif = 1, 
        result,
        sum = 10000,
        timelimit = sber_period.val(),
        now_date = new Date(),
        day = now_date.getDate(),
        month = now_date.getMonth(),
        year = now_date.getFullYear(),
        back_date = new Date(year, month+timelimit*1, day), 
        options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };
        
        recount();
        /*console.log('now_date = '+ now_date.toLocaleString("ru", options));
        console.log('back_date = '+ back_date.toLocaleString("ru", options));
        console.log(amount_days);*/
        
        function recount() {
            amount_days = beetween_days(now_date, back_date); //получили количество дней
            persent_state = persentCalc(sber_period.val(), sber_type.val());  //получили процентную ставку
            income_man = Math.floor(calc_sum.val()/100 * persent_state * amount_days / 365);//Доход пайщика = 100000 * 16% * 183 / 365 = 8021
            non_taxable = Math.floor(calc_sum.val()/100 * 12.5 * amount_days / 365); //Необлагаемая сумма = 100000 * 15,5% * 183 / 365 = 7771 
            taxable = income_man - non_taxable; //Облагаемый доход = 8021 – 7771 = 250
            tax_state = Math.floor(taxable/100*35); //Налог по ставке 35% = 250 * 35 % = 87 
            income_clear = Math.round(income_man - tax_state); //на руки
            
            result_outptut_in.html(calc_sum.val()+" ₽");
            time_outptut.html( theEnd( $('#sber_calc_period2').val() ) );
            sber_state.html(persent_state+'%');
            
            result_outptut_out.html(income_clear+calc_sum.val()+1+' ₽');
            
        }
        $(document).on("change", "#sber_tarif2", function() {
            initTypeSber();
            recount();
        });
        $(document).on("change keyup", "#sber_calc_sum2", function() {
            sum = $(this).val();
           // console.log('sum = '+sum);
            recount();
        });
        $(document).on("change keyup", "#sber_calc_period2", function() {
            timelimit = $(this).val();
        //    console.log('timelimit = '+timelimit);
            recount();
        });
        
		$(document).on("click", ".tab-content__tabs a", function() {
			var selectedTab = $(this).attr("data_tab");
			$('#sber_tarif').val(selectedTab); // Set the value of the select element to the selected tab
			initTypeSber();
			recount();
		  });
    });	
});
