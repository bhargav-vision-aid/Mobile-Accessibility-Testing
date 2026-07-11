const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('pname') || '';

document.addEventListener('DOMContentLoaded', () => {
    const userNameDisplay = document.getElementById('user-name');
    if (userNameDisplay) {
        userNameDisplay.textContent = userName ? userName : "Co-learner";
    }

    if (userName) {
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                const separator = href.includes('?') ? '&' : '?';
                if (!href.includes('pname=')) {
                    link.setAttribute('href', `${href}${separator}pname=${encodeURIComponent(userName)}`);
                }
            }
        });
    }

    document.querySelectorAll('[aria-expanded]').forEach(acc => {
        acc.addEventListener('click', toggleAccordion);
        acc.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(e);
            }
        });
    });

    function toggleAccordion(e) {
        const trigger = e.target;
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const contentId = trigger.getAttribute('aria-controls');
        const content = document.getElementById(contentId);

        trigger.setAttribute('aria-expanded', !isExpanded);

        if (content) {
            content.style.display = isExpanded ? 'none' : 'block';
        }
    }

    const mcqForm = document.querySelector('form');
    const isMCQPage = document.querySelector('input[name="question1"]');

    if (mcqForm && isMCQPage) {
        const correctAnswers = {
            question1: 'a',
            question2: '3',
            question3: 'b',
            question4: 'c',
            question5: 'b',
            question6: 'b'
        };

        mcqForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let resultString = '';
            let allCorrect = true;
            const formData = new FormData(mcqForm);

            Object.keys(correctAnswers).forEach((question, index) => {
                const answer = formData.get(question);
                const qNum = index + 1;

                if (!answer) {
                    resultString += `Question ${qNum} is not filled.\n`;
                    allCorrect = false;
                } else if (answer !== correctAnswers[question]) {
                    resultString += `Question ${qNum} is incorrect.\n`;
                    allCorrect = false;
                } else {
                    resultString += `Question ${qNum} is correct.\n`;
                }
            });

            if (allCorrect) {
                const successMessage = "Thank you for completing this mobile accessibility testing exercise, fellow co-learners!\n\nWe hope you thoroughly enjoyed this hands-on learning activity as much as we did. Stepping out of pure theory and into real-world screen reader interactions is what truly helps us master mobile auditing.\n\nBy diving into the sandbox today, we are reinforcing the core skills needed to build an inclusive digital world together. Thank you for participating, and let us keep this fantastic momentum going as we advance toward our next training milestones!\n\nRegards,\nVA-DAT Team.";

                alert(successMessage);
                window.location.href = `home.html?pname=${encodeURIComponent(userName)}`;
            } else {
                alert(resultString.trim() + "\n\nPlease fill all the questions with accurate answer to finish.");
            }
        });
    }
});