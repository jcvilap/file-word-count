# Word Counter
This is a small ```NodeJS/ES6``` program that takes a text file and outputs a unique list of all words found within the document and the count for how many times that word appeared.

As a data structure, a simple JavaScript object was used to represent a tree, where the properties are used as links and the node holds a count to represent how many times the word (from the root down to the node) appears in the input text.

The algorithm takes, at a higher level, the folowing steps:
  1. Read the file line by line
  2. For each line of text encountered:
```javascript

    /**
     * Updates tree with the words contained in line
     * @param line {String}
     * @private
     */
    _readLine(line = '') {
        var node = this.tree;
        for (var i = 0, char; i < line.length; i++) {                // Loop through every char in the line
            char = line.charAt(i).toString().toLowerCase();          // Make char lowercase to avoid duplicates
            if (char && /[A-Za-z0-9]/.test(char)) {                   // Validate char(alphanumeric only)
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
```



### Sample Input
```
"Nobody has yet been able to determine conclusively whether NP-complete problems are in fact solvable in
polynomial time, making this one of the great unsolved problems of mathematics. The Clay Mathematics
Institute is offering a US $1 million reward to anyone who has a formal proof that P=NP or that P≠NP."
```
### Output
```
"1" -> count: 1
"nobody" -> count: 1
"np" -> count: 3
"has" -> count: 2
"yet" -> count: 1
"been" -> count: 1
"a" -> count: 2
"able" -> count: 1
"are" -> count: 1
"anyone" -> count: 1
"to" -> count: 2
"time" -> count: 1
"this" -> count: 1
"the" -> count: 2
"that" -> count: 2
"determine" -> count: 1
"conclusively" -> count: 1
"complete" -> count: 1
"clay" -> count: 1
"whether" -> count: 1
"who" -> count: 1
"p" -> count: 2
"problems" -> count: 2
"proof" -> count: 1
"polynomial" -> count: 1
"in" -> count: 2
"institute" -> count: 1
"is" -> count: 1
"fact" -> count: 1
"formal" -> count: 1
"solvable" -> count: 1
"making" -> count: 1
"mathematics" -> count: 2
"million" -> count: 1
"one" -> count: 1
"of" -> count: 2
"offering" -> count: 1
"or" -> count: 1
"great" -> count: 1
"unsolved" -> count: 1
"us" -> count: 1
"reward" -> count: 1

```
### Usage
Clone repo, run `npm install` and then run `npm run dev` to start the server locally and run the code.

