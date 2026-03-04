#!/bin/bash
# Script om WY Cleaning website naar GitHub te uploaden

echo "=== WY Cleaning Website GitHub Upload Script ==="
echo ""

# Controleer of we in de juiste map zitten
if [ ! -f "index.html" ]; then
    echo "Fout: index.html niet gevonden. Script moet in wycleaning-website map draaien."
    exit 1
fi

# Vraag om GitHub gebruikersnaam
echo -n "Voer je GitHub gebruikersnaam in: "
read USERNAME

# Vraag om repository naam (default: wycleaning-website)
echo -n "Repository naam [wycleaning-website]: "
read REPO_NAME
REPO_NAME=${REPO_NAME:-wycleaning-website}

echo ""
echo "Maak eerst een repository aan op GitHub:"
echo "1. Ga naar: https://github.com/new"
echo "2. Repository name: $REPO_NAME"
echo "3. Klik 'Create repository'"
echo ""
echo -n "Druk Enter als je de repository hebt aangemaakt..."
read

echo ""
echo "Pushen naar GitHub..."

# Add remote and push
git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git"
git branch -M main
git push -u origin main

echo ""
echo "✅ Klaar! Je website staat op:"
echo "https://github.com/$USERNAME/$REPO_NAME"
echo ""
echo "🌐 Om via GitHub Pages live te gaan:"
echo "1. Ga naar je repository op GitHub"
echo "2. Settings → Pages"
echo "3. Selecteer 'Deploy from a branch'"
echo "4. Selecteer 'main' branch en '/ (root)'"
echo "5. Klik Save"
echo ""
echo "Je site is dan live op: https://$USERNAME.github.io/$REPO_NAME"
