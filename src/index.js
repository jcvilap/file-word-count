import { WordCounter } from './WordCounter';

let wordCounter = new WordCounter('text.in');

// Populate tree
wordCounter.countWords();

// Print word count from tree
wordCounter.logTree();
