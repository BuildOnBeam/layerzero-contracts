const fs = require('fs');
const path = require('path');

const settings = {
    ERC20Upgradeable: {
        fileName: '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol',
        path: '../node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol',
        searchValue: /uint256\[45\] private __gap;/g,
        replaceValue: 'uint256[7] private __gap;',
    },
    ERC20PermitUpgradeable: {
        fileName: '@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol',
        path: '../node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol',
        searchValue: /uint256\[49\] private __gap;/g,
        replaceValue: 'uint256[25] private __gap;',
    },
    EIP712Upgradeable: {
        fileName: '@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol',
        path: '../node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol',
        searchValue: /uint256\[48\] private __gap;/g,
        replaceValue: 'uint256[7] private __gap;',
    }
}

/**
 * Modifies a file by replacing a specified string with another.
 * @param {string} fileName - Name of the file to be consoled.
 * @param {string} filePath - The path to the target file.
 * @param {RegExp} searchValue - The string or RegExp to search for.
 * @param {string} replaceValue - The string to replace the searchValue with.
 */
function modifyFile(fileName, filePath, searchValue, replaceValue) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${fileName}`, err);
            return;
        }

        const result = data.replace(searchValue, replaceValue);

        fs.writeFile(filePath, result, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing file: ${fileName}`, err);
                return;
            }
            console.log(`File successfully modified: ${fileName}`);
        });
    });
}

// Adjust the gaps in OpenZeppelin contracts
console.log('yarn postinstall');
for (const key in settings) {
    if (settings.hasOwnProperty(key)) {
        const setting = settings[key];
        modifyFile(
            setting.fileName,
            path.join(__dirname, setting.path),
            setting.searchValue,
            setting.replaceValue
        );
    }
}
