import { createInterface } from 'readline';
import { createReadStream } from 'fs';

/**
 * Created by jvila6 on 11/17/16.
 */
export class WordCounter {

    /**
     * Constructor
     * @param filePath {String}
     */
    constructor(filePath) {
        this.filePath = filePath;
        this.tree = {count: 0};
    }

    /**
     * Reads and processes file line by line
     */
    countWords() {
        try {
            let reader = createInterface({
                input: createReadStream(this.filePath)
            });
            reader.on('line', line => this._readLine(line));
            reader.on('close', line => this._logTree());
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Updates tree with the words contained in line
     * @param line {String}
     * @private
     */
    _readLine(line = '') {
        var node = this.tree;
        for (var i = 0, char; i < line.length; i++) {                // Loop through every char in the line
            char = line.charAt(i).toString().toLowerCase();          // Make char lowercase to avoid duplicates
            if (char && /[A-Za-z0-9]/.test(char)) {                  // Validate char(alphanumeric only)
                if (!node.hasOwnProperty(char)) {                    // Node does not contain char
                    node[char] = {count: 0};                         // Initialize new node for char
                }
                if(i === line.length - 1){                           // Last character in line
                    node[char].count++;                              // Increment count in node
                }
                node = node[char];                                   // Otherwise move down to the next node
            } else if (node !== this.tree) {                         // Invalid char found(end of word)
                node.count++;                                        // Increment count in node
                node = this.tree;                                    // Point node back to root
            }
        }
    }

    /**
     * Recursive function to traverse and print the words and counts stored
     * in the tree
     * @param node {Object}
     * @param buffer {String}
     */
    _logTree(node = this.tree, buffer = '') {
        if (node.count > 0) {
            console.log(`"${buffer}" -> count: ${node.count}`);
        }
        for (let i in node) {
            if (node.hasOwnProperty(i) && i !== 'count') {
                this._logTree(node[i], `${buffer}${i}`)
            }
        }
    }
}
