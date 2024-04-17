class RSA {
    constructor() {
        this.p = 3;
        this.q = 11;
        this.n = this.p * this.q;
        this.phi = (this.p - 1) * (this.q - 1);
        this.e = 7; 
        this.d = 3; 
    }

    encrypt(message) {
        let encrypted = '';
        for (let i = 0; i < message.length; i++) {
            const charCode = message.charCodeAt(i);
            encrypted += Math.pow(charCode, this.e) % this.n + ' ';
        }
        return encrypted.trim();
    }

    decrypt(ciphertext) {
        let decrypted = '';
        const cipherArray = ciphertext.split(' ');
        for (let i = 0; i < cipherArray.length; i++) {
            const decryptedCharCode = Math.pow(parseInt(cipherArray[i]), this.d) % this.n;
            decrypted += String.fromCharCode(decryptedCharCode);
        }
        return decrypted;
    }
}

class CryptoContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    executeStrategy(message) {
        return this.strategy(message);
    }
}

class AlphabetToNum {
    convert(letter) {
        const upperCaseLetter = letter.toUpperCase();
        if (upperCaseLetter < 'A' || upperCaseLetter > 'Z') {
            return "Input must be a letter (A-Z)";
        }
        // Convert letter to number (A=1, Z=26)
        return upperCaseLetter.charCodeAt(0) - 64;
    }
}

class NumToAlphabet {
    convert(number) {
        if (number < 1 || number > 26) {
            return "Input must be between 1 and 26";
        }
        // Convert number to uppercase letter (A=65, Z=90 in ASCII)
        return String.fromCharCode(64 + number);
    }
}

// Adding event listener for the new container
document.addEventListener('DOMContentLoaded', function () {
    // Event listener for Number to Alphabet conversion
    const numToAlphaBtn = document.getElementById('numToAlphaBtn');
    if (numToAlphaBtn) {
        numToAlphaBtn.addEventListener('click', function () {
            const inputNumber = parseInt(document.getElementById('numToAlphaInput').value);
            const converter = new NumToAlphabet();
            const result = converter.convert(inputNumber);
            document.getElementById('alphaResult').innerText = `Result: ${result}`;
        });
    }

    // Event listener for Alphabet to Number conversion
    const alphaToNumBtn = document.getElementById('alphaToNumBtn');
    if (alphaToNumBtn) {
        alphaToNumBtn.addEventListener('click', function () {
            const inputLetter = document.getElementById('alphaToNumInput').value;
            if (inputLetter.length !== 1 || !isNaN(inputLetter)) {
                document.getElementById('numResult').innerText = "Please enter a single letter (A-Z)";
                return;
            }
            const converter = new AlphabetToNum();
            const result = converter.convert(inputLetter);
            document.getElementById('numResult').innerText = `Number: ${result}`;
        });
    }

    // Event listener for Encryption
    const encryptBtn = document.getElementById('encryptBtn');
    if (encryptBtn) {
        encryptBtn.addEventListener('click', function () {
            const inputText = document.getElementById('encryptInput').value.toUpperCase();
            const rsa = new RSA();
            const cryptoContext = new CryptoContext(rsa.encrypt.bind(rsa));
            const encrypted = cryptoContext.executeStrategy(inputText);
            document.getElementById('encryptedResult').innerText = `Encrypted: ${encrypted}`;
        });
    }

    // Event listener for Decryption
    const decryptBtn = document.getElementById('decryptBtn');
    if (decryptBtn) {
        decryptBtn.addEventListener('click', function () {
            const inputText = document.getElementById('decryptInput').value;
            const rsa = new RSA();
            const cryptoContext = new CryptoContext(rsa.decrypt.bind(rsa));
            const decrypted = cryptoContext.executeStrategy(inputText);
            document.getElementById('decryptedResult').innerText = `Decrypted: ${decrypted}`;
        });
    }
}); 
