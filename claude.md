## Code style guideliens

Absolutely never write in-line JSX style tags. Try to avoid using in-line style classes if possible. Always write tailwind classes. 
If you find yourself repeating the same LONG class over and over please write either a 1. simple reusable JSX component 2. a tailwind utility class

## Minimizing code block sizes
Try to always define files for constants that are properly named to organize code better and keep things more readable. When defining constants in a JSX element, let's move it to a special constant file instead.

Same goes for utils, please try to keep utility functions inside of util files.
If a util is performing complex logic, try to break it down into more reusable utils. Try to make utils as reusable as possible in general by also naming them well. Keep small JSDocs above them, if necessary. Absolutely never just define numbers and strings in config objects: define outer constants that are easily readable and modifiable.

Instead of using types/hardcoding strings later to reference those same types, or hardcoding strings in switch statements, define enums that are nicely reusable later. 

## Styling guidelines

When putting rounded elements inside of rounded parents (such as toggle buttons within containers) ensure that the roundedness of the parent is whatever the rounded class of the child element is PLUS the padding between the 2. So for example, if parent is rounded-2xl and child is rounded-2xl and the parent has p-2, the parent must become whatever rounded-2xl + the size of p-2 is.

## Next.js Structure Rules
Folder Structure
app/                    # Routes only
├── (group)/            # Route groups (no URL impact)
│   └── route/_components/  # Route-specific (underscore = private)
components/             # Shared UI
├── ui/                 # Primitives (button, card, input)
└── layout/             # Shell (header, sidebar)
lib/                    # External connections (db, auth, APIs, services)
hooks/                  # Custom React hooks
types/                  # TypeScript definitions
utils/                  # Pure helper functions
config/                 # App configuration