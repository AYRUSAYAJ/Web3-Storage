// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    struct File {
        string fileName;
        string fileCID;
        address owner; // Add an owner field to the File struct
    }

    File[] public files;

    function addFile(string memory _fileName, string memory _fileCID) public {
        files.push(File(_fileName, _fileCID, msg.sender));
    }

    function deleteFile(uint index) public {
        require(index < files.length, "File does not exist");
        require(msg.sender == files[index].owner, "Only the owner can delete this file");
        // Move the last element to the position of the element to be deleted
        files[index] = files[files.length - 1];
        // Remove the last element
        files.pop();
    }

    function getFileCount() public view returns (uint) {
        return files.length;
    }

    function getFile(uint index) public view returns (string memory, string memory, address) {
        require(index < files.length, "File does not exist");
        File storage file = files[index];
        return (file.fileName, file.fileCID, file.owner);
    }

    // Additional function to get individual file details
    function getFileName(uint index) public view returns (string memory) {
        require(index < files.length, "File does not exist");
        return files[index].fileName;
    }

    function getFileCID(uint index) public view returns (string memory) {
        require(index < files.length, "File does not exist");
        return files[index].fileCID;
    }

    function getFileOwner(uint index) public view returns (address) {
        require(index < files.length, "File does not exist");
        return files[index].owner;
    }
}
