function populateData(data) {
    console.log(data);

    populateRecruiterData(data.recruiter);
    populateCandidateData(data.candidate);
    populateQuestionnaireData(data.questionnaire);

    populate_index(data);

    populateList(data);
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
        "Date of Report:", formatDate(questionnaireData.date)
    );
    questionnaireDetailsBody.appendChild(detailItem_questionnaireDate.element);

    const detailItem_questionnaireTime = new DetailItemComponent(
        "Time of Report:", formatTime(questionnaireData.date)
    );
    questionnaireDetailsBody.appendChild(detailItem_questionnaireTime.element);
}

function populate_index(data) {
    const howToContentCategories_filtered = data?.howToContentCategories?.filter(howToContentCategory => {
        return data?.list.find(listItem => {
            return listItem.howToContents?.find(howToContent => {
                return howToContent.assignTo?.value == howToContentCategory?.value;
            });
        });
    });

    console.log("howToContentCategories_filtered", howToContentCategories_filtered);

    const indexElement = document.querySelector(".index .content-card-body ol");

    howToContentCategories_filtered.forEach((indexItem) => {
        const indexItemElement = document.createElement("li");
        indexItemElement.innerText = indexItem.label;
        indexElement.appendChild(indexItemElement);
    });
}

function populateList(data) {
    const listData = data.list;

    listData.forEach((listItemData) => {
        if (listItemData.howToContents?.length) {
            listItemData.howToContents.forEach(populateList_howToContent);
        }

        if (listItemData.reportModule) {
            populateList_reportModule(data, listItemData.reportModule);
        }
    });
}

function populateList_howToContent(howToContentData) {
    const howToContentElement = document.querySelector(".content-cards");

    const howToContentComponent = new HowToContentComponent(
        howToContentData.assignTo?.label, howToContentData.contents
    );

    howToContentElement.appendChild(howToContentComponent.element);
}

function populateList_reportModule(data, reportModuleData) {
    const reportModulesContentCardBody = document.querySelector(".content-cards");

    const title = reportModuleData[reportModuleData.assignedTo].title;
    const scoreText = [reportModuleData.scoreMin, reportModuleData.scoreMax].join("-");
    const scoreGraphicItem = data.scoreGraphics.find(scoreGraphic =>
        scoreGraphic.score >= reportModuleData.scoreMin &&
        scoreGraphic.score <= reportModuleData.scoreMax
    );

    const scoreGraphicUrl = scoreGraphicItem?.image;

    const reportModuleComponent = new ReportModuleComponent(
        title,
        scoreText ? `${scoreText}%` : "",
        reportModuleData.summary,
        scoreGraphicUrl,
        reportModuleData.reportText
    );

    reportModulesContentCardBody.appendChild(reportModuleComponent.element);
}