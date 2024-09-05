document.addEventListener('DOMContentLoaded', () => {
    
    const MAX_KEYS_PER_GAME_PER_DAY = 10000;
    //const EVENTS_DELAY = 20000;

    const games = {
        1: {
            name: 'Chain Cube 2048',
            appToken: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
            promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
            eventsDelay: 20000,
            attemptsNumber: 15,
        },
        2: {
            name: 'Train Miner',
            appToken: '82647f43-3f87-402d-88dd-09a90025313f',
            promoId: 'c4480ac7-e178-4973-8061-9ed5b2e17954',
            eventsDelay: 20000,
            attemptsNumber: 15,
        },
        3: {
            name: 'MergeAway',
            appToken: '8d1cc2ad-e097-4b86-90ef-7a27e19fb833',
            promoId: 'dc128d28-c45b-411c-98ff-ac7726fbaea4',
            eventsDelay: 20000,
            attemptsNumber: 15,
        },
        4: {
            name: 'Twerk Race 3D',
            appToken: '61308365-9d16-4040-8bb0-2f4a4c69074c',
            promoId: '61308365-9d16-4040-8bb0-2f4a4c69074c',
            eventsDelay: 20000,
            attemptsNumber: 15,
        },
        5: {
            name: 'Polysphere',
            appToken: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
            promoId: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
            eventsDelay: 20000,
            attemptsNumber: 18,
        },
        6: {
            name: 'Mow and Trim',
            appToken: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
            promoId: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
            eventsDelay: 21000,
            attemptsNumber: 17,
        },
        7: {
            name: 'ZooPolis',
            appToken: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
            promoId: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
            eventsDelay: 21000,
            attemptsNumber: 22,
	},
	8: {
            name: 'Fluff Crusade',
            appToken: '112887b0-a8af-4eb2-ac63-d82df78283d9',
            promoId: '112887b0-a8af-4eb2-ac63-d82df78283d9',
            eventsDelay: 20000,
            attemptsNumber: 32,
        },
	9: {
            name: 'Tile Trio',
            appToken: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7',
            promoId: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7',
            eventsDelay: 20000,
            attemptsNumber: 22,
            
	},
	10: {
            name: 'Stone Age',
            appToken: '04ebd6de-69b7-43d1-9c4b-04a6ca3305af',
            promoId: '04ebd6de-69b7-43d1-9c4b-04a6ca3305af',
            eventsDelay: 20000,
            attemptsNumber: 22,
            
	}
    };

    // Morse code map for digits
    const morseCodeMap = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.'
    };

    // Convert text to Morse code with formatted output
    function textToFormattedMorse(text) {
        return text.split('').map(char => {
            const morse = morseCodeMap[char.toUpperCase()];
            if (!morse) return ''; // Skip unknown characters
            return formatMorse(morse);
        }).join('\n');
    }

    // Format Morse code for display
    function formatMorse(morse) {
        return morse.split('').map(symbol => {
            if (symbol === '-') return '▬'; // Dash for Morse code
            if (symbol === '.') return '●'; // Dot for Morse code
            return ''; // Skip any other characters
        }).join(' ');
    }

    // Fetch daily cipher and display Morse code
    async function fetchDailyCipher() {
        const authorization = 'Bearer 17192275270598VV9aqYH7Gw4VPoKEnkimr9SxayT9NX2mAvXwpV3PjbOcUCA8WgaheIv0EPGNahB7264202224';

        try {
            const response = await fetch('https://api.hamsterkombatgame.io/clicker/config', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': authorization,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            if (response.ok) {
                const data = await response.json();
                const cipher = data.dailyCipher.cipher;

                if (cipher) {
                    // Modify the cipher and decode from Base64
                    const modifiedCipher = cipher.slice(0, 3) + cipher.slice(4);
                    const decodedCipher = atob(modifiedCipher);

                    // Convert to formatted Morse code
                    const formattedMorseCode = textToFormattedMorse(decodedCipher);

                    // Display the decoded cipher and Morse code
                    document.getElementById('decodedCipher').innerText = decodedCipher;
                    document.getElementById('morseCode').innerText = formattedMorseCode;

                    // Show the display area
                    document.getElementById('cipherDisplay').classList.remove('hidden');
                } else {
                    alert("Error: No cipher received.");
                }
            } else {
                alert(`Error fetching cipher: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching cipher:", error);
            alert("Error fetching cipher.");
        }
    }

    // Attach event listener to the button
    document.getElementById('fetchCipherBtn').addEventListener('click', fetchDailyCipher);
    
    const startBtn = document.getElementById('startBtn');
    const keyCountSelect = document.getElementById('keyCountSelect');
    const keyCountLabel = document.getElementById('keyCountLabel');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressLog = document.getElementById('progressLog');
    const keyContainer = document.getElementById('keyContainer');
    const keysList = document.getElementById('keysList');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const generatedKeysTitle = document.getElementById('generatedKeysTitle');
    const gameSelect = document.getElementById('gameSelect');
    const copyStatus = document.getElementById('copyStatus');
    const previousKeysContainer = document.getElementById('previousKeysContainer');
    const previousKeysList = document.getElementById('previousKeysList');
    const telegramChannelBtn = document.getElementById('telegramChannelBtn');

    const initializeLocalStorage = () => {
        const now = new Date().toISOString().split('T')[0];
        Object.values(games).forEach(game => {
            const storageKey = `keys_generated_${game.name}`;
            const storedData = JSON.parse(localStorage.getItem(storageKey));
            if (!storedData || storedData.date !== now) {
                localStorage.setItem(storageKey, JSON.stringify({ date: now, count: 0, keys: [] }));
            }
        });
    };

    const generateClientId = () => {
        const timestamp = Date.now();
        const randomNumbers = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join('');
        return `${timestamp}-${randomNumbers}`;
    };

    const login = async (clientId, appToken) => {
        const response = await fetch('https://api.gamepromo.io/promo/login-client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appToken,
                clientId,
                clientOrigin: 'deviceid'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        return data.clientToken;
    };

    const emulateProgress = async (clientToken, promoId) => {
        const response = await fetch('https://api.gamepromo.io/promo/register-event', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${clientToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promoId,
                eventId: generateUUID(),
                eventOrigin: 'undefined'
            })
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data.hasCode;
    };

    const generateKey = async (clientToken, promoId) => {
        const response = await fetch('https://api.gamepromo.io/promo/create-code', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${clientToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promoId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate key');
        }

        const data = await response.json();
        return data.promoCode;
    };

    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const delayRandom = () => Math.random() / 3 + 1;

    initializeLocalStorage();

    startBtn.addEventListener('click', async () => {
        const gameChoice = parseInt(gameSelect.value);
        const keyCount = parseInt(keyCountSelect.value);
        const game = games[gameChoice];

        const storageKey = `keys_generated_${game.name}`;
        const storedData = JSON.parse(localStorage.getItem(storageKey));

        if (storedData.count + keyCount > MAX_KEYS_PER_GAME_PER_DAY) {
            alert(`You can generate only ${MAX_KEYS_PER_GAME_PER_DAY - storedData.count} more keys for ${game.name} today.`);
            previousKeysList.innerHTML = storedData.keys.map(key =>
                `<div class="key-item">
                    <input type="text" value="${key}" readonly>
                </div>`
            ).join('');
            previousKeysContainer.classList.remove('hidden');
            return;
        }

        keyCountLabel.innerText = `تعداد کلید: ${keyCount}`;

        progressBar.style.width = '0%';
        progressText.innerText = '0%';
        progressLog.innerText = '';
        progressContainer.classList.remove('hidden');
        keyContainer.classList.add('hidden');
        generatedKeysTitle.classList.add('hidden');
        keysList.innerHTML = '';
        keyCountSelect.classList.add('hidden');
        gameSelect.classList.add('hidden');
        startBtn.classList.add('hidden');
        copyAllBtn.classList.add('hidden');
        startBtn.disabled = true;

        let progress = 0;
        const updateProgress = (increment, message) => {
            progress += increment;
            progressBar.style.width = `${progress}%`;
            let roundedProgress = progress.toFixed(2);
            progressText.innerText = `${roundedProgress}%`;
            progressLog.innerText = message;
        };
    

    const generateKeyProcess = async () => {
    const clientId = generateClientId();
    let clientToken;
    try {
        clientToken = await login(clientId, game.appToken);
    } catch (error) {
        alert(`Failed to login: ${error.message}`);
        startBtn.disabled = false;
        return null;
    }

    for (let i = 0; i < game.attemptsNumber; i++) {
        let countdown = game.eventsDelay / 1000  ;
        const countdownContainer = document.getElementById('countdownContainer');
        const countdownTimer = document.getElementById('countdownTimer');

        countdownContainer.style.display = 'block';
        countdownTimer.textContent = countdown;

        const countdownInterval = setInterval(() => {
            countdown -= 1;
            countdownTimer.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);

        await sleep(game.eventsDelay * delayRandom());

        clearInterval(countdownInterval);
        countdownContainer.style.display = 'none';

        const hasCode = await emulateProgress(clientToken, game.promoId);
        updateProgress(((100 / game.attemptsNumber) / keyCount), '');
        if (hasCode) {
            break;
        }
    }

    try {
        const key = await generateKey(clientToken, game.promoId);
        if (key) {
            updateProgress(30 / keyCount, '');
            storedData.count += 1; // افزایش شمارش کلیدها بلافاصله پس از تولید هر کلید
            storedData.keys.push(key); // اضافه کردن کلید جدید به آرایه keys
            localStorage.setItem(storageKey, JSON.stringify(storedData)); // بروزرسانی فایل ذخیره محلی بلافاصله پس از تولید هر کلید
        }
        return key;
    } catch (error) {
        alert(`Failed to generate key: ${error.message}`);
        return null;
    }
};

  const keys = await Promise.all(Array.from({ length: keyCount }, generateKeyProcess));

     if (keys.some(key => key)) {
        keysList.innerHTML = keys.filter(key => key).map(key =>
           `<div class="key-item">
              <input type="text" value="${key}" readonly>
                 <button class="copyKeyBtn" data-key="${key}">کپی کلید</button>
             </div>`
         ).join('');
      copyAllBtn.classList.remove('hidden');
    } else {
        alert('No keys were generated successfully.');
    }

    keyContainer.classList.remove('hidden');
    generatedKeysTitle.classList.remove('hidden');
    document.querySelectorAll('.copyKeyBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const key = event.target.getAttribute('data-key');
            navigator.clipboard.writeText(key).then(() => {
              copyStatus.innerText = `Copied ${key}`;
                setTimeout(() => {
                    copyStatus.innerText = '';
                }, 2000);
             }).catch(err => {
                console.error('متن کپی نشد: ', err);
            });
        });
    });

    startBtn.disabled = false;
    keyCountSelect.classList.remove('hidden');
    gameSelect.classList.remove('hidden');
    startBtn.classList.remove('hidden');
    });

    copyAllBtn.addEventListener('click', () => {
        const allKeys = Array.from(document.querySelectorAll('.key-item input')).map(input => input.value).join('\n');
        navigator.clipboard.writeText(allKeys).then(() => {
            copyStatus.innerText = 'همه کلید ها کپی شد';
            setTimeout(() => {
                copyStatus.innerText = '';
            }, 2000);
        }).catch(err => {
            console.error('متن کپی نشد: ', err);
        });
    });

    document.getElementById('ShowKeysBtn').addEventListener('click', () => {
        const generatedCodesContainer = document.getElementById('generatedCodesContainer');
        const generatedCodesList = document.getElementById('generatedCodesList');
        generatedCodesList.innerHTML = ''; // Clear the list

        let codesGeneratedToday = [];

        Object.keys(games).forEach(key => {
            const game = games[key];
            const storageKey = `keys_generated_${game.name}`;
            const storedData = JSON.parse(localStorage.getItem(storageKey));

            if (storedData && storedData.keys && storedData.keys.length > 0) {
                codesGeneratedToday = codesGeneratedToday.concat(storedData.keys.map(code => {
                    return `<li>${game.name}: ${code}</li>`;
                }));
            }
        });

        if (codesGeneratedToday.length > 0) {
            generatedCodesList.innerHTML = codesGeneratedToday.join('');
        } else {
            generatedCodesList.innerHTML = '<li>امروز کلیدی دریافت نکرده اید.</li>';
        }

        generatedCodesContainer.style.display = 'block';
    });

    
});
