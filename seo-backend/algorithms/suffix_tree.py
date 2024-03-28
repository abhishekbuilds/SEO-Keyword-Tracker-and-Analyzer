class SuffixTree:
    class Node:
        def __init__(self, label):
            self.label = label 
            self.children = {}

    def __init__(self, s):
        self.root = self.Node(None)
        s += "$"  
        for i in range(len(s)):
            self.add_suffix(s[i:])

    def add_suffix(self, suffix):
        current = self.root
        for char in suffix:
            if char not in current.children:
                current.children[char] = self.Node(suffix)
                break
            current = current.children[char]
            tail = current.label[len(suffix):]
            if tail and tail[0] != suffix[0]:  # Edge splitting
                current.children[tail[0]] = self.Node(tail)
                current.label = suffix

    def search(self, pattern):
        current = self.root
        for char in pattern:
            if char in current.children:
                child = current.children[char]
                label = child.label
                if label.startswith(pattern):
                    return True
                current = child
            else:
                return False
        return True

    @staticmethod
    def search_pattern(text, pattern):
        tree = SuffixTree(text)
        return tree.search(pattern)