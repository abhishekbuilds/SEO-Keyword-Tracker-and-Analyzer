class SuffixArray:
    @staticmethod
    def search_pattern(text, pattern):
        suffix_array = build_suffix_array(text)
        return search_pattern(text, pattern, suffix_array)

def build_suffix_array(s):
    suff = [(s[i:], i) for i in range(len(s))]
    suff.sort(key=lambda x: x[0])
    return [x[1] for x in suff]

def search_pattern(text, pattern, suffix_array):
    left, right = 0, len(suffix_array) - 1
    while left <= right:
        mid = (left + right) // 2
        if pattern == text[suffix_array[mid]:suffix_array[mid]+len(pattern)]:
            return True 
        elif pattern > text[suffix_array[mid]:]:
            left = mid + 1
        else:
            right = mid - 1
    return False 