function populateData(data) {
    console.log(data);

    populateRecruiterData(data.recruiter);
    populateCandidateData(data.candidate);
    populateQuestionnaireData(data.questionnaire);
    populateList(data.list);
}

function populateRecruiterData(recruiterData) {
    const recruiterNameElement = document.querySelector(".recruiter .name");
    const recruiterEmailElement = document.querySelector(".recruiter .email");

    recruiterNameElement.textContent = recruiterData.name;
    recruiterEmailElement.textContent = recruiterData.email;
}

function populateCandidateData(candidateData) {
    const recruiterNameElement = document.querySelector(".candidate .name");
    const recruiterEmailElement = document.querySelector(".candidate .email");

    recruiterNameElement.textContent = candidateData.name;
    recruiterEmailElement.textContent = candidateData.email;
}

function populateQuestionnaireData(questionnaireData) {
    const questionnaireDetailsBody = document.querySelector(
        ".questionnaire-details .content-card-body"
    );

    const detailItem_questionnaireName = new DetailItemComponent(
        "Name", questionnaireData.name
    );
    questionnaireDetailsBody.appendChild(detailItem_questionnaireName.element);

    const detailItem_questionnaireDate = new DetailItemComponent(
        "Date:", questionnaireData.date
    );
    questionnaireDetailsBody.appendChild(detailItem_questionnaireDate.element);
}

//
const a = {
    "scoreMin": 80,
    "_id": "38a4fcea-6194-4834-a299-6471215d38c2",
    "mindset": {
        "number": 12,
        "_id": "32759e71-3e68-480b-8e6c-f1b4b0965b65",
        "_owner": "9c9398c6-0452-45e1-8d94-b4de16e25734",
        "_createdDate": "2024-09-18T13:22:09.291Z",
        "_updatedDate": "2024-09-18T13:25:00.035Z",
        "title": "Grateful Mindset vs. Entitled Mindset "
    },
    "reportText": "The c",
    "scoreMax": 100,
    "assignedTo": "mindset",
    "summary": "This candidate demonstrates an 80-100% alignment with the Grateful Mindset attribute."
}
//

function populateList(listData) {
    const reportModulesContentCardBody = document.querySelector(
        ".report-modules .content-card-body"
    );

    listData.map((listItemData) => {
        if (listItemData.reportModule) {
            const title = listItemData.reportModule[listItemData.reportModule.assignedTo].title;
            const scoreText = [listItemData.reportModule.scoreMin, listItemData.reportModule.scoreMax].join("-");

            const reportModuleComponent = new ReportModuleComponent(
                title,
                scoreText ? `${scoreText}%` : "",
                listItemData.reportModule.summary,
                "sampleImages/scoreGauge.png",
                listItemData.reportModule.reportText
            );

            reportModulesContentCardBody.appendChild(reportModuleComponent.element);
        }
    });
}