import type { Lesson } from './types';

export const lessons: Lesson[] = [
  {
    id: 'intro-to-algebra',
    title: 'Introduction to Algebra',
    type: 'video',
    description: 'Learn the fundamental concepts of algebra, including variables, expressions, and equations.',
    content: `## Welcome to Introduction to Algebra!

This lesson will cover the foundational concepts that underpin all of algebra. We'll start by understanding what variables are and how they are used to represent unknown quantities.

### Key Topics:
- **Variables and Constants:** What's the difference?
- **Algebraic Expressions:** How to write and simplify them.
- **Solving Basic Equations:** The concept of balancing equations to find the value of a variable.

Let's begin with a simple example. If you have a box of apples and you don't know how many are inside, you can use a variable, like 'x', to represent that number. If you add 2 more apples, you now have 'x + 2' apples. This is an algebraic expression.

An equation sets two expressions equal to each other. For example, if you know that after adding 2 apples you have 10 in total, you can write the equation:
x + 2 = 10

To solve for x, you need to isolate it on one side of the equation. By subtracting 2 from both sides, you get:
x = 8

This means you started with 8 apples. This is the core idea of solving equations in algebra. Throughout this lesson, we will explore more complex examples and build your confidence in handling algebraic problems.`,
    isPro: false,
  },
  {
    id: 'linear-equations',
    title: 'Solving Linear Equations',
    type: 'video',
    description: 'Master the techniques for solving single and multi-step linear equations.',
    content: `## Mastering Linear Equations

Building on our introduction, this lesson focuses on the techniques required to solve linear equations. A linear equation is an equation for a straight line.

### Key Concepts:
- **One-Step Equations:** Using inverse operations (addition/subtraction, multiplication/division).
- **Two-Step Equations:** Combining multiple inverse operations.
- **Equations with Variables on Both Sides:** How to consolidate variables to solve the equation.

For example, consider the equation:
3y - 8 = y + 6

1.  **Combine variables:** Subtract 'y' from both sides.
    2y - 8 = 6
2.  **Isolate the variable term:** Add 8 to both sides.
    2y = 14
3.  **Solve for the variable:** Divide by 2.
    y = 7

This lesson provides numerous practice problems to ensure you are comfortable with these steps.`,
    isPro: false,
  },
  {
    id: 'quadratic-equations',
    title: 'Introduction to Quadratic Equations',
    type: 'pdf',
    description: 'Explore quadratic equations and learn how to solve them by factoring and using the quadratic formula.',
    content: `## Diving into Quadratic Equations

Quadratic equations are equations of the second degree, meaning they contain a term with a variable raised to the power of 2. The standard form is:
ax² + bx + c = 0

### Solving Methods:
- **Factoring:** If the quadratic expression can be factored, we can set each factor to zero to find the solutions.
- **Quadratic Formula:** For any quadratic equation, the solutions can be found using the formula:
  x = [-b ± sqrt(b² - 4ac)] / 2a

This is a powerful tool that works for all quadratic equations. For example, for x² + 5x + 6 = 0:
a=1, b=5, c=6.
Factoring gives (x+2)(x+3)=0, so x=-2 or x=-3.

This lesson is a premium feature, offering in-depth tutorials and advanced problem sets.`,
    isPro: true,
  },
  {
    id: 'calculus-derivatives',
    title: 'The Essence of Calculus: Derivatives',
    type: 'video',
    description: 'A premium lesson on understanding derivatives and their application in finding rates of change.',
    content: `## The Essence of Calculus: Derivatives

This PRO lesson introduces the concept of the derivative, a fundamental tool in calculus. The derivative represents the instantaneous rate of change of a function.

### Core Ideas:
- **The Limit Definition of a Derivative:** Understanding how derivatives are formally defined.
- **Power Rule, Product Rule, Quotient Rule:** Essential rules for finding derivatives of various functions.
- **Applications:** How derivatives are used to find the slope of a tangent line, velocity, and acceleration.

For a function f(x) = x², the derivative, denoted as f'(x), is 2x. This means the slope of the function at any point x is 2x.

Unlock this lesson to gain a deep understanding of one of the most important concepts in mathematics.`,
    isPro: true,
  },
];
