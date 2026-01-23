## Code style guideliens

Absolutely never write in-line JSX style tags. Try to avoid using in-line style classes if possible. Always write tailwind classes. 
If you find yourself repeating the same LONG class over and over please write either a 1. simple reusable JSX component 2. a tailwind utility class

## Styling guidelines

When putting rounded elements inside of rounded parents (such as toggle buttons within containers) ensure that the roundedness of the parent is whatever the rounded class of the child element is PLUS the padding between the 2. So for example, if parent is rounded-2xl and child is rounded-2xl and the parent has p-2, the parent must become whatever rounded-2xl + the size of p-2 is.