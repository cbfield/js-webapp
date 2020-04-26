document.getElementById('issueInputForm').addEventListener('submit', saveIssue)

function saveIssue(e){
    let desc = document.getElementById('issueDescInput').value
    let severity = document.getElementById('severityInput').value
    let asignee = document.getElementById('asigneeInput').value
    let id = chance.guid()
    let status = 'Open'

    let issue = {
        id: id,
        description: desc,
        severity: severity,
        asignee: asignee,
        status: status
    }

    if (localStorage.getItem('issues') == null){
        let issues = []
        issues.push(issue)
        localStorage.setItem('issues',JSON.stringify(issues))
    }else{
        let issues = JSON.parse(localStorage.getItem('issues'))
        issues.push(issue)
        localStorage.setItem('issues',JSON.stringify(issues))
    }

    document.getElementById('issueInputForm').reset()
    fetchIssues()
    e.preventDefault()
}

function setStatusClosed(id){
    let issues = JSON.parse(localStorage.getItem('issues'))
    for (var i=0; i<issues.length; i++){
        if (issues[i].id == id){
            issues[i].status = 'Closed'
        }
    }
    localStorage.setItem('issues',JSON.stringify(issues))
    fetchIssues()
}

function deleteIssue(id){
    let issues = JSON.parse(localStorage.getItem('issues'))
    for (var i=0; i<issues.length; i++){
        if (issues[i].id == id){
            issues.splice(i,1)
        }
    }
    localStorage.setItem('issues',JSON.stringify(issues))
    fetchIssues()
}

function fetchIssues(){
    if (localStorage.getItem('issues') == null){
        localStorage.setItem('issues',JSON.stringify([]))
    }
    let issues = JSON.parse(localStorage.getItem('issues'))
    let issueList = document.getElementById('issueList')

    issueList.innerHTML = ''
    for (var i = 0; i < issues.length; i++){
        let id = issues[i].id
        let desc = issues[i].description
        let severity = issues[i].severity
        let asignee = issues[i].asignee
        let status = issues[i].status

        issueList.innerHTML +=  '<div class="well">'+
                                    '<h6>Issue ID: '+id+'</h6>'+
                                    '<p><span class="label label-info">'+status+'</span>'+'</p>'+
                                    '<h3>'+desc+'</h3>'+
                                    '<p><span class="glyphicon glyphicon-time"></span>'+severity+'</p>'+
                                    '<p><span class="glyphicon glyphicon-user"></span>'+asignee+'</p>'+
                                    '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a>'+
                                    '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                '</div>'
  }
}