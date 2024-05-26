-- CreateTable
CREATE TABLE "MentorAvailablity" (
    "id" SERIAL NOT NULL,
    "mentorId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentorAvailablity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MentorAvailablity" ADD CONSTRAINT "MentorAvailablity_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
