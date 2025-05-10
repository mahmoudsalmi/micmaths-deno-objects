## micmaths-deno-objects

This project collects and re-implements the mathematical "objects" created by Mickaël Launay on his Micmaths YouTube series **"Fabrication des objets mathématiques"**, but targeting the [Deno](https://deno.land/) runtime instead of Python. The goal is to:

- **Reproduce** each object's generation logic in modern TypeScript, using Deno's out-of-the-box tooling.
- **Share** interactive, easy-to-run examples for both learners and enthusiasts who prefer JavaScript/TypeScript.
- **Extend** the series by making it effortless to experiment, tweak parameters, and even embed the objects in web pages.

## Motivation

1. **Portability & Modern Tooling**  
   Deno provides a secure, single-executable environment with built-in TypeScript support and a secure-by-default permission model. Porting these creations to Deno makes them:
    - Instantly runnable with `deno run`—no virtual environments or pip installs.
    - Safe by default: file, network, or environment access must be explicitly enabled.
    - Ready for the Web: easily bundleable for front-end demos.

2. **Learning Opportunity**  
   Translating Python code into TypeScript deepens understanding of both languages, numerical methods, and the geometry behind each object.

3. **Community Engagement**  
   Encourages JavaScript/TypeScript developers and students to play with mathematical art, contribute new objects, and adapt the code in their own projects.

## Implemented Objects

This project follows Mickaël Launay's series of mathematical objects. Here's what has been implemented so far:

### 1. Checkerboard Inversion

**Source video**: [Retour vers l'inversion et première image Ulule - Micmaths](https://www.youtube.com/watch?v=AalmiaowRxY&t=5190s)

This implementation creates:
- A standard checkerboard pattern with customizable colors
- An inverted version using circle inversion transformation
- Multiple color variations through customizable color pairs

The circle inversion transforms each point (x,y) relative to a circle, producing fascinating geometric patterns that demonstrate the mathematical concept of inversion. The invariable ray defines the circle used for the inversion transformation.

## Running the Project

To generate all implemented mathematical objects:

```bash
deno run --allow-write --allow-read src/main.ts
```

This will create image files in the project directory for each implemented object with their various color combinations.
