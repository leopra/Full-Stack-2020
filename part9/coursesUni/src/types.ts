export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseNormalPart extends CourseDescriptionPart {
    type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseDescriptionPart extends CoursePartBase {
    description: string;

}
interface CourseSubmissionPart extends CourseDescriptionPart {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptionPart {
    type: "special";
    requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;