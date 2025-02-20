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
    "_publishDate": "2025-02-18T07:21:11.041Z",
    "assignTo": {
        "label": "General Introduction to the Report",
        "value": "all-1"
    },
    "_id": "096f78e5-ffca-488b-ab7d-e65a24bfdc8f",
    "_owner": "9c9398c6-0452-45e1-8d94-b4de16e25734",
    "_createdDate": "2025-02-18T07:21:11.041Z",
    "_updatedDate": "2025-02-18T07:21:11.041Z",
    "_publishStatus": "PUBLISHED",
    "content": "<p>",
    "title": "General Introduction to the Report"
}
//

function populateList(listData) {
    const reportModulesContentCardBody = document.querySelector(
        ".report-modules .content-card-body"
    );

    listData.forEach((listItemData) => {
        if (listItemData.howToContents?.length) {
            listItemData.howToContents.forEach((howToContentData) => {
                const howToContentComponent = new HowToContentComponent(
                    howToContentData.assignTo?.label,
                    howToContentData.content
                );

                reportModulesContentCardBody.appendChild(howToContentComponent.element);
            });
        }

        if (listItemData.reportModule) {
            const title = listItemData.reportModule[listItemData.reportModule.assignedTo].title;
            const scoreText = [listItemData.reportModule.scoreMin, listItemData.reportModule.scoreMax].join("-");

            const reportModuleComponent = new ReportModuleComponent(
                title,
                scoreText ? `${scoreText}%` : "",
                listItemData.reportModule.summary,
                "../sampleImages/scoreGauge.png",
                listItemData.reportModule.reportText
            );

            reportModulesContentCardBody.appendChild(reportModuleComponent.element);
        }
    });
}