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
    const compartmentIds = [
        "a96c31af-f893-4401-bed9-98c8d1cf585b",
        "efd7b5cc-d4ee-4db9-a8b7-56a34bed82cb",
        "ac23cba7-fd16-468c-b5ed-6c0bc8b3c70c",
        "abb21ee5-90d0-415f-b621-a11639392613",
        "76bcceec-14ad-4faf-b3c9-749da61ba5b8"
    ];

    const indexElement = document.querySelector(".index .content-card-body ol");

    const indexItems = [];

    data.list.forEach((listItemData) => {
        listItemData?.howToContents?.forEach((howToContentData) => {
            if (howToContentData?.assignTo?.collectionName == "Compartments") {
                indexItems.push(howToContentData.assignTo);
            }
        });
    });

    indexItems.sort((a, b) => {
        aIndex = compartmentIds.indexOf(a.value);
        bIndex = compartmentIds.indexOf(b.value);

        return aIndex - bIndex;
    }).forEach((indexItem) => {
        const indexItemElement = document.createElement("li");
        indexItemElement.innerText = indexItem.label;
        indexElement.appendChild(indexItemElement);
    });
}

function populateList(data) {
    const listData = data.list;

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
            const scoreGraphicItem = data.scoreGraphics.find(scoreGraphic =>
                scoreGraphic.score >= listItemData.reportModule.scoreMin &&
                scoreGraphic.score <= listItemData.reportModule.scoreMax
            );

            const scoreGraphicUrl = scoreGraphicItem?.image;

            const reportModuleComponent = new ReportModuleComponent(
                title,
                scoreText ? `${scoreText}%` : "",
                listItemData.reportModule.summary,
                scoreGraphicUrl,
                listItemData.reportModule.reportText
            );

            reportModulesContentCardBody.appendChild(reportModuleComponent.element);
        }
    });
}