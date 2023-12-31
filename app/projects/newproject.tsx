import { Project } from "@prisma/client";
import { getUserSession } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";


type NewProjectProps = {
    project?: Project
}

const NewProject = ({ project }: NewProjectProps) => {

    async function createProject(data: FormData) {
        "use server"

        const user = await getUserSession()
        const project = await prisma.project.create({
            data: {
                name: data.get("name") as string,
                owner: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })
        revalidatePath('/projects')
    }

    return (
        <div className="flex justify-center">
            <form action={createProject} className="relative h-10 w-11/12 mt-5 mx-5">
                <input
                    type="text"
                    className="peer h-full w-full rounded-[7px] border border-slate-800 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-slate-800 placeholder-shown:border-t-slate-800 focus:border-2 focus:border-indigo-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-slate-800"
                    name="name"
                    defaultValue={project?.name || " "}
                />
                <button
                    className="!absolute right-1 top-1 z-10 select-none rounded bg-indigo-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-900 transition-all hover:shadow-lg hover:shadow-indigo-900/40 focus:opacity-[0.65] focus:shadow-none active:opacity-[0.65] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-slate-800 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                    type="submit"
                    data-ripple-light="true"
                >
                    Create
                </button>
                <label className="text-gray-500 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-800 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-800">
                    New Project
                </label>
            </form>
        </div>
    )
}

export default async function NewProjects() {
    return (
        <NewProject/>
    )
}