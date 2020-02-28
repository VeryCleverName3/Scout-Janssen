//Takes one bot's match
function calcBotUnreliantMatch(info){

  info.totalHatches = (1 * info["HA"]) + (1 * info["HT"]);
  info.totalCargo = 0 + info["CA"] + info["CT"];
  info.totalHatchPoints = info.totalHatches * 2;
  info.totalCargoPoints = info.totalCargo * 3;
  info.totalCyclePoints = 0 + (info["HT"] * 2) + (info["CT"]);
  info.totalAutoPoints = (info["jumpLevel"] * 3) + (info["HA"] * 2) + (info["CA"] * 3);
  info.climbPoints = 0;
  switch(info["climbLevel"]){
    case 0:
      info.climbPoints = 0;
      break;
    case 1:
      info.climbPoints = 3;
      break;
    case 2:
      info.climbPoints = 6;
      break;
    case 3:
      info.climbPoints = 12;
      break;
  }
  info.climbAssistPoints = (info["habAssistLevel2"] * 3) + (info["habAssistLevel3"] * 9);
  info.totalEndgamePoints = 0 + info.climbPoints + info.climbAssistPoints;
  info.totalOffensePoints = 0 + info.totalAutoPoints + info.totalCyclePoints + info.totalEndgamePoints;

  return info;
}

function getMatchWithNumber(reports, matchNum){
  var newReports = [];
  for(var i = 0; i < reports.length; i++){
    if(reports[i].matchNumber == matchNum){
      newReports.push(reports[i]);
    }
  }

  return newReports;
}

function getBotsInMatch(match){
  var bots = {};
  for(i of match){
      bots["bot" + match[i].position] = i;
  }

  return bots;
}

//Takes array of variables, replaces ? with them
function average(variables, s){
  var sum = 0;
  for(i of variables){
    sum += eval(s.replace("?", i));
  }

  sum /= variables.length;
}

//Takes all matches of one bot as info
function getAllAverageDataOnBot(info){
  var keys = Object.keys(info);
  var subKeys = Object.keys(info[keys[0]]);
  for(var i = 0; i < Object.entries(info[keys[0]]).length; i++){
    var variables = [];
    for(var j = 0; j < Object.entries(info).length; j++){
      variables[j] = info[keys[i]][subKeys[j]];
    }
    info[keys.length] = [];
    info[keys.length][subKeys[i] + "Average"] = average(variables, "?");
  }

  return info;
}

//Takes one bot's match
function calcBotReliantMatch(info){

}

async function rqAPI(url, func){
  const request = new Request(url, init)
  let response = await fetch(request);
  func(response);
}

async function getReports(){
  var reports;
  var newReports = [];

  rqAPI('https://frc4026.com/scout/json', (response) => {
    response.json().then(function(value){
      reports = value;
    })
  });
/*} catch(e) {
    reports = JSON.parse(`[{"model": "scoutingtool.report", "pk": 8, "fields": {"scouter": "Hayden", "team": 1414, "match": 115, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 9, "fields": {"scouter": "Hayden", "team": 1002, "match": 115, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 10, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 11, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 12, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 13, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 14, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 15, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 16, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 17, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 18, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 19, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 20, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 21, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 22, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 23, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 24, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 25, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 26, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 27, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 28, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 29, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 30, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 31, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 32, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 33, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 34, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 35, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 36, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 37, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 38, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 39, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 40, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 41, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 42, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 43, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 44, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 45, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 46, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 47, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}, {"model": "scoutingtool.report", "pk": 48, "fields": {"scouter": "Cory", "team": 1414, "match": 243, "initiationLine": false, "onePointMadeTele": 0, "onePointMissedTele": 0, "twoPointMadeTele": 0, "twoPointMissedTele": 0, "wheelTurn": false, "wheelColor": false, "climb": false, "climbAssist": 0, "balanceResponsibility": false, "onePointMadeAuto": 0, "onePointMissedAuto": 0, "twoPointMadeAuto": 0, "twoPointMissedAuto": 0, "timeOnDefense": 0.0, "bot1Defense": 0.0, "bot2Defense": 0.0, "bot3Defense": 0.0, "timeInoperable": 0.0, "notes": "klijoumn;swaxziefsdihkujnfesduhijknfSjhbky,n fdzs gykubhvlf CADSubhikv fdsAIUHGBLiouj", "estimate3pt": 0}}]`)
  }*/
  for(var i = 0; i < reports.length; i++){
    newReports.push(reports[i].fields);
  }
  return newReports;
}

function getReportsOfOneBot(teamNum, reports){
  var rep = [];
  for(i of reports){
    if(i.team == teamNum){
      rep.push(i);
    }
  }

  return rep;
}

function calcBotStuffReliantOnTeams(info){
  info.defensePointsBotFour = info["badBot1"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotOne"] - info["badBot1"]["timeInable"]);
  info.defensePointsBotFive = info["badBot2"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotTwo"] - info["badBot2"]["timeInable"]);
  info.defensePointsBotSix = info["badBot3"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotThree"] - info["badBot3"]["timeInable"]);

  info.totalDefensePoints = info.defensePointsBotFive + info.defensePointsBotFour + info.defensePointsBotSix;

  info.netOffensePoints = info.totalOffensePoints - info.offensePenalties;

  info.netDefensePoints = info.netDefensePoints - info.defensePenalties;

  info.totalContribution = info.totalOffensePoints + info.totalDefensePoints;

  info.netContribution = info.netDefensePoints + info.netOffensePoints;

  return info;
}

//TODO: duress + points given

/*async function run(teamNumber){
  var data = await getReports();
  var botData = getReportsOfOneBot(teamNumber, data);
  for(i in botData){
    botData[i] = calcBotUnreliantMatch(botData[i]);
  }
  return botData;
}*/