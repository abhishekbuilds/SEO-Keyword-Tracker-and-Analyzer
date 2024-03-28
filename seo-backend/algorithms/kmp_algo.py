class KMPAlgo:
    @staticmethod
    def compute_lps_array(pattern):
        lps = [0] * len(pattern)
        length = 0
        i = 1
        while i < len(pattern):
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length-1]
                else:
                    lps[i] = 0
                    i += 1
        return lps

    @staticmethod
    def kmp_search(text, pattern):
        lps = KMPAlgo.compute_lps_array(pattern)
        i = j = 0
        count = 0
        while i < len(text):
            if pattern[j] == text[i]:
                i += 1
                j += 1
            if j == len(pattern):
                count += 1
                j = lps[j-1]
            elif i < len(text) and pattern[j] != text[i]:
                if j != 0:
                    j = lps[j-1]
                else:
                    i += 1
        return count

    @staticmethod
    def search_pattern(text, pattern):
        return KMPAlgo.kmp_search(text, pattern)