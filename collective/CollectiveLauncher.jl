module CollectiveLauncher

using Collective
const words = wordlist(open(".\\collective\\113809of.fic"))
corpus = Corpus(words)

# puzzle = ["questionable", "businesswoman", "exhaustion", "discouraged", "communicated", "hallucinogen", "sequoia"]
# puzzle = ["unitedarabemirates", "cat", "pinelabel", "karate", "abacus", "babariba", "malala"]

puzzle = map(String, split(ARGS[1],","))
results = analyze(corpus, puzzle)
for r in sort(results)[1:10]
   println(r)
end

end # module
