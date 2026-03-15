export interface DocumentaryContent {
  title: string;
  hook: string;
  introduction: string;
  chapters: {
    title: string;
    content: string;
    visuals?: string;
  }[];
  conclusion: string;
}

export const generateMockContent = async (topic: string): Promise<DocumentaryContent> => {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  return {
    title: topic,
    hook: `Imagine a world where ${topic} takes center stage, changing everything we thought we knew.`,
    introduction: `In this comprehensive exploration of ${topic}, we delve into the origins, current impact, and future implications of this fascinating subject. From historical roots to modern innovations, we uncover the layers that make ${topic} so significant in today's world.`,
    chapters: [
      {
        title: "The Foundation",
        content: `To understand ${topic}, we must first look at its foundational principles. It started as a simple concept but quickly evolved into something far more complex. Experts suggest that the early developments in ${topic} paved the way for the breakthroughs we see today.`,
        visuals: "A slow pan across historical documents and early blueprints."
      },
      {
        title: "The Modern Landscape",
        content: `Today, ${topic} is everywhere. Its influence stretches across industries and cultures. In this segment, we examine how global connectivity has accelerated the adoption and transformation of ${topic}, making it more accessible and impactful than ever before.`,
        visuals: "Fast-paced montage of modern cityscapes and digital interfaces."
      },
      {
        title: "Challenges and Controversies",
        content: `No progress comes without friction. ${topic} faces significant hurdles, ranging from ethical dilemmas to technical limitations. Critics argue that we must proceed with caution, while proponents highlight the immense potential for positive change if these challenges are addressed.`,
        visuals: "Split screen showing contrasting viewpoints and protest footage."
      }
    ],
    conclusion: `As we conclude our journey into ${topic}, one thing is clear: its story is far from over. Whether it's through continued innovation or societal adaptation, ${topic} will remain a cornerstone of our collective future.`
  };
};

export const formatContentToString = (content: DocumentaryContent): string => {
  let output = `DOCUMENTARY SCRIPT: ${content.title.toUpperCase()}

`;
  output += `[HOOK]
${content.hook}

`;
  output += `[INTRODUCTION]
${content.introduction}

`;

  content.chapters.forEach((chapter, index) => {
    output += `[CHAPTER ${index + 1}: ${chapter.title.toUpperCase()}]
`;
    output += `NARRATOR: ${chapter.content}
`;
    if (chapter.visuals) output += `VISUALS: ${chapter.visuals}
`;
    output += `
`;
  });

  output += `[CONCLUSION]
${content.conclusion}
`;
  return output;
};