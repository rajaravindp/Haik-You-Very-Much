async function generateHaiku() {
    const haikuOutput = document.getElementById('Haiku')
    haikuOutput.textContent = "Generating your haiku..."

    try {
        const apiKey = "YOUR-API-KEY"
        const prompt = "Write a haiku in the 5-7-5 syllable structure:"

        // Make API call to OpenAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are an expert in Haiku writing. Please generate a unique Haiku each time you are prompted." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 50,
                temperature: 0.7,
            })
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()

        // Display haiku
        const haiku = data.choices[0].message.content.trim()
        haikuOutput.textContent = haiku
    } catch (error) {
        haikuOutput.textContent = "Sorry, couldn't generate a haiku at the moment. Please try again later."
        console.error(error)
    }
}

// Attach event listener to Go button
document.getElementById('generateHaiku').addEventListener('click', generateHaiku)
