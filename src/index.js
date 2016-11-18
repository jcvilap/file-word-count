import { WordCounter } from './WordCounter';

let wordCounter = new WordCounter('text.in');

// Populate tree
wordCounter.count();

// Print word count from tree
wordCounter.logTree();