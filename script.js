let topicHistory = JSON.parse(localStorage.getItem('topicHistory')) || {};

document.getElementById('analyze').addEventListener('click', () => {
    const researchTopic = document.getElementById('researchTopic').value;
    const researchPaper = document.getElementById('researchPaper').files[0];

    if (!researchPaper) {
        alert('Please upload a research paper.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function() {
        const pdfData = reader.result;
        const prompt = `Analyze the research paper on "${researchTopic}" and provide a structured summary. Paper data: ${pdfData}`;

        document.getElementById('result').textContent = 'Analyzing...';
        document.getElementById('loading').style.display = 'block';

        fetch('http://127.0.0.1:5000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none';

            if (data.result) {
                document.getElementById('result').textContent = data.result;
                document.getElementById('save').style.display = 'block';
                document.getElementById('save').dataset.content = data.result;
                document.getElementById('copy').style.display = 'block';
                document.getElementById('copy').dataset.content = data.result;

                if (!topicHistory[researchTopic]) {
                    topicHistory[researchTopic] = [];
                }
                topicHistory[researchTopic].push({ prompt: prompt, response: data.result });
                localStorage.setItem('topicHistory', JSON.stringify(topicHistory));
            } else if (data.error) {
                document.getElementById('result').textContent = `Error: ${data.error}`;
                document.getElementById('save').style.display = 'none';
                document.getElementById('copy').style.display = 'none';
            }
            displayTopics();
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('result').textContent = `Network Error: ${error}`;
            document.getElementById('save').style.display = 'none';
            document.getElementById('copy').style.display = 'none';
        });
    };
    reader.readAsDataURL(researchPaper);
});

document.getElementById('save').addEventListener('click', () => {
    const content = document.getElementById('save').dataset.content;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analyzed_paper.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('copy').addEventListener('click', () => {
    const content = document.getElementById('copy').dataset.content;
    navigator.clipboard.writeText(content).then(() => {
        alert('Text copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text.');
    });
});

document.getElementById('historyButton').addEventListener('click', () => {
    const historyDiv = document.getElementById('history');
    if (historyDiv.style.display === 'none') {
        historyDiv.style.display = 'block';
        displayTopics();
    } else {
        historyDiv.style.display = 'none';
    }
});

function displayTopics() {
    const topicList = document.getElementById('topicList');
    topicList.innerHTML = '';
    Object.keys(topicHistory).forEach(topic => {
        const topicItem = document.createElement('div');
        topicItem.classList.add('topic-item');
        topicItem.textContent = topic;
        topicItem.addEventListener('click', () => displayTopicInteractionsInMain(topic));
        topicList.appendChild(topicItem);
    });
}

function displayInteractions(topic) {
    const interactionList = document.getElementById('interactionList');
    interactionList.innerHTML = '';
    topicHistory[topic].forEach(interaction => {
        const interactionItem = document.createElement('div');
        interactionItem.classList.add('interaction-item');
        interactionItem.innerHTML = `<p class="prompt">Prompt: ${interaction.prompt}</p><p>Response: ${interaction.response}</p>`;
        interactionItem.addEventListener('click', () => {
            document.getElementById('result').textContent = interaction.response;
        });
        interactionList.appendChild(interactionItem);
    });
}

function displayTopicInteractionsInMain(topic) {
    const mainResult = document.getElementById('result');
    mainResult.innerHTML = '';

    if (topicHistory[topic]) {
        topicHistory[topic].forEach(interaction => {
            const interactionDiv = document.createElement('div');
            interactionDiv.innerHTML = `<p class="prompt">Prompt: ${interaction.prompt}</p><p>Response: ${interaction.response}</p><hr>`;
            mainResult.appendChild(interactionDiv);
        });
    } else {
        mainResult.textContent = 'No interactions found for this topic.';
    }
}

document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('result').textContent = '';
});

document.getElementById('researchPaper').addEventListener('change', function() {
    if (this.files.length > 0) {
        document.getElementById('fileUploadStatus').textContent = 'File added successfully';
        document.getElementById('fileUploadStatus').style.display = 'block';
    } else {
        document.getElementById('fileUploadStatus').style.display = 'none';
    }
});