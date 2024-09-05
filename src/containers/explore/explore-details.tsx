"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { fireStore } from '@/firebase/firebaseConfig'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineStar } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { ClipLoader } from 'react-spinners'


interface RatingType {
  user: string;
  rating: number;
  comment?: string;
}

interface ProjectType {
  id: string;
  name: string;
  categories: string;
  email: string;
  description: string;
  src: string;
  profileImage: string | any;
  rating: RatingType[]; // Update to array of objects
}

const ExploreDetails = () => {
  const router = useRouter();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [userName, setUserName] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProjectDetails = async () => {
        const docRef = doc(fireStore, "creators", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const projectData = docSnap.data() as ProjectType;
          console.log("fg", projectData);
          projectData.rating = projectData.rating || [];
          setProject(projectData);
        } else {
          console.log("No such document");
        }
      };
      fetchProjectDetails();
    }
  }, [id]);
  console.log(project);

  const handleSubmit = async () => {
    if (project && id && userComment.trim() && userRating > 0) {
      setLoading(true);

      const newRating = {
        user: userName,
        rating: userRating,
        comment: userComment,
      };

      await updateDoc(doc(fireStore, "creators", id as string), {
        rating: arrayUnion(newRating),
      });

      setProject({
        ...project,
        rating: [...project.rating, newRating],
      });

      setUserRating(0); // Reset the rating after submission
      setUserComment(""); // Reset the comment after submission
      setLoading(false);
    }
  };

  const averageRating =
    project && project.rating.length > 0
      ? project.rating.reduce((acc, cur) => acc + cur.rating, 0) /
        project.rating.length
      : 0;

  if (!project)
    return (
      <div className="flex justify-center items-center h-[100svh]">
        <ClipLoader color="#501078" />
      </div>
    );
  return (
    <div>
       <div className="px-4 sm:px-[6%] py-[5%] w-full">
      <div className="flex items-center mb-6">
        <Button
          onClick={() => router.back()}
          className="mr-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <AiOutlineArrowLeft size={24} color="black" />
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src={project.src}
          alt="creator's image"
          width={300}
          height={300}
          className="rounded-[16px] object-cover"
        />
        <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold my-6">
          {project.name}
        </h1>

        <Link href={`mailto:${project.email}`}>
          <p className="flex bg-[#501078] text-white items-center gap-2 p-3 rounded-sm mb-5">
            <MdEmail /> Hire me
          </p>
        </Link>

      

        <div className="flex gap-3">
          <p className="rounded-[16px] bg-gray-200 px-3 py-1 text-sm sm:text-lg">
            {project.categories}
          </p>
        </div>

        <div className="flex mt-4 items-center">
          <span className="text-xl font-bold mr-2">Average Rating: </span>
          <div className="flex">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index}>
                {averageRating > index ? (
                  <AiFillStar className="text-[#FFD700]" size={24} />
                ) : (
                  <AiOutlineStar className="text-[#FFD700]" size={24} />
                )}
              </span>
            ))}
          </div>
          <span className="ml-2 text-lg">
            (
            {typeof averageRating === "number"
              ? averageRating.toFixed(1)
              : "0.0"}
            )
          </span>
        </div>
        <p className="mt-4 text-center max-w-2xl">{project.description}</p>
        <div className="mt-8 w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Rate & Comment</h2>
          <div className="flex items-center mb-4">
            <span className="text-lg font-semibold mr-2">Add Rating:</span>
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} onClick={() => setUserRating(index + 1)}>
                  {userRating > index ? (
                    <AiFillStar className="text-[#FFD700]" size={24} />
                  ) : (
                    <AiOutlineStar className="text-[#FFD700]" size={24} />
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name:
              </label>
              <Input
                id="name"
                value={userName}
                onChange={(e:any) => setUserName(e.target.value)}
                className="w-full p-3 rounded-md border"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium">
                Comment:
              </label>
              <Textarea
                id="comment"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="w-full p-3 rounded-md border"
                placeholder="Add your comment..."
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-[#501078] text-white rounded-md w-full hover:bg-inherit hover:text-inherit"
            disabled={loading || userRating === 0 || !userComment.trim()} // Disable button if rating is 0 or comment is empty
          >
            {loading ? <ClipLoader /> : "Submit"}
          </Button>
        </div>
        <div className="mt-8 w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Ratings & Comments</h2>
          <div className="mt-6">
            {project.rating?.map((ratingItem, index) => (
              <div key={index} className="border-b py-2">
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500">{ratingItem.user}:</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <span key={starIndex}>
                        {ratingItem.rating > starIndex ? (
                          <AiFillStar className="text-[#FFD700]" size={18} />
                        ) : (
                          <AiOutlineStar className="text-[#FFD700]" size={18} />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-md mt-2">{ratingItem.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export  {ExploreDetails}