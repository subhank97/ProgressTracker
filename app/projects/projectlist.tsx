import { Project } from "@prisma/client";
import { getUserSession } from "../lib/auth";
import { prisma } from "../lib/prisma";

type ProjectListProps = {
    projects: Project[]
}
const ProjectsList = ({ projects }: ProjectListProps) => {
    return (
        <div className="flex justify-center">
            <div className="relative overflow-x-auto w-11/12 mt-6">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Project
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time Spent
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Weekly Chart
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th key={project.id} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {project.name}
                                </th>
                                <td className="px-6 py-4">
                                    4.5 hours
                                </td>
                                <td className="px-6 py-4">
                                    Insert graph here
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default async function ProjectList() {
    const user = await getUserSession()

    const projectList = await prisma.project.findMany({
        where: {
            ownerId: user.id
        }
    })

    const currentProject = await prisma.project.findFirst({
        where: {
            ownerId: user.id,
        },
    })
    
    return (
        <ProjectsList projects={projectList}/>
    )
}