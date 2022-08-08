/** 
 * Find Neighboring Faces - Algorithm #2
**/

/**
 * Question
 * Algorithm 2: Write an algorithm that processes the output of Algorithm 1 in order to find
the neighboring faces of any face. It should take the output of Algorithm 1 as input,
unique identifier for the face and output an array of face identifiers. The face identifiers
might be an integer or string. Include tests (with text descriptions of the input data)
demonstrating that it works. Comment your code with specifics about the computational
complexity of your implementation.
**/


/**
 *Pseudocode Solution 
 *Iterate through Algo #1 Solution to identify if faces share half-edge twins with each other. 
 *For each face, identify if edges share between (while keeping time complexity 0(n) down)
 *Add a new object attribute to identify neighboring faces to each face object
**/


