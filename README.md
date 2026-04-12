# Node Group Website

Live site managed via Claude Code. No developer needed.

---

## Folder Structure

```
index.html                          ← The entire website (single file)
/images
  /projects
    /project-name                   ← One folder per project
      01.jpg                        ← Always name photos 01.jpg, 02.jpg etc.
      02.jpg
  /team
    /person-name                    ← One folder per team member
      photo.jpg                     ← Always called photo.jpg
  /general
    /hero                           ← Homepage hero image
    /about                          ← About page images
```

---

## Adding a New Project

1. Create folder: `images/projects/your-project-name/`
2. Drop photos in, named `01.jpg`, `02.jpg`, `03.jpg` etc.
3. Open Claude Code in this folder and say:

```
New project — [Project Name], [type e.g. heritage scaffold], [Month Year],
client [Client Name]. [2-3 sentences about what made it interesting/complex].
Photos in /images/projects/[folder-name]/. Add it to the site and push.
```

---

## Updating Existing Content

Open Claude Code in this folder and describe the change:

- "Update the phone number to 020 XXXX XXXX and push"
- "Change Rory's bio to [new text] and push"
- "Update the hero headline to [new text] and push"
- "Remove the Millbrook Hall project and push"
- "Add a new team member called [Name], role [Role], bio [text], photo at /images/team/name/photo.jpg and push"

---

## Updating Team Photos

1. Add photo to `images/team/person-name/photo.jpg`
2. Tell CC: "Update [Name]'s photo to /images/team/person-name/photo.jpg and push"

---

## Naming Rules (important)

- Folder names: lowercase, hyphens only, no spaces — e.g. `baker-street` not `Baker Street`
- Photos: always `01.jpg`, `02.jpg` etc. inside project folders
- Team photos: always `photo.jpg`
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

---

## Tech Stack

- **Hosting:** Netlify (free)
- **Repo:** GitHub
- **CMS:** Claude Code
- **Deployment:** Automatic — any push to main deploys live within 30 seconds

---

## Domain

nodegroup.co.uk → pointed at Netlify via Namecheap nameservers
