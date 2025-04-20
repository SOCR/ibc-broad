import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ibcTeamMembers } from "@/data/marketData";
import { Users } from "lucide-react";

// Team member card remains unchanged
const TeamMemberCard: React.FC<{
  name: string;
  title?: string;
  bio?: string;
  image?: string;
}> = ({ name, title, bio, image }) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-msu-green">
            {image ? <AvatarImage src={image} alt={name} /> : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            {title && <CardDescription className="text-sm">{title}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {bio && <p className="text-muted-foreground">{bio}</p>}
      </CardContent>
    </Card>
  );
};

// --- New: Accurate List of Student Researchers ---
const studentResearchers = [
  "Andrea Galvan",
  "Annie Sukosky",
  "Ari Shaffar",
  "Cameron Levis",
  "Clare Hampel",
  "Daisy Kelly",
  "Dipika Rao",
  "Harris Mcaree",
  "Kaleb Davis",
  "Mara Bartlett",
  "Micheal Barron",
  "Nina Miller",
  "Paris Carter",
  "Radina Dinov",
  "Sean Fleming",
  "Seth Kunio",
  "Sterling Solek",
  "Valerie Mcnamara",
  "Yagumo Morikawa"
];

const Team: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">International Business Center Team</h1>
        <div className="flex items-center">
          <Users className="mr-2 h-6 w-6 text-msu-green" />
          <span className="font-semibold">MSU Broad College</span>
        </div>
      </div>
      
      {/* IBC Leaders & Staff */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ibcTeamMembers.map((member) => (
          <TeamMemberCard 
            key={member.name}
            name={member.name}
            title={member.title}
            bio={member.bio}
            image={member.image}
          />
        ))}
      </div>

      {/* Student Researchers */}
      <div>
        <h2 className="mt-8 mb-2 text-xl font-semibold text-msu-green">IBC Student Researchers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentResearchers.map((name) => (
            <TeamMemberCard 
              key={name}
              name={name}
              title="Student Researcher"
              bio={undefined}
              image={undefined}
            />
          ))}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>About the International Business Center</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Michigan State University's International Business Center (IBC) has been the national leader in offering programs to internationalize business education at community colleges since 1995. IBC is designated and funded as a "Center for International Business Education and Research" by the US Department of Education — one of only 15 universities in the country with this designation.
          </p>
          <p>
            IBC began benchmarking community colleges in 2008 to report on international business programming. Data are collected regularly, with most data collected at each interval but with some data collected less frequently.
          </p>
          <p>
            IBC is the developer of globalEDGE — the Google No. 1 ranked website for "international business resources" with more than two million active users. globalEDGE has dedicated resources for Community colleges.
          </p>
          <p>
            IBC is engaged in strategic partnerships with Community Colleges for International Development (CCID), American Association of Community Colleges (AACC), and National Association for Community College Entrepreneurship (NACCE) to internationalize business education at community colleges.
          </p>
          <div className="mt-4 text-center">
            <p className="font-semibold">Contact Information</p>
            <p className="text-sm text-muted-foreground">
              Broad College of Business<br />
              645 N. Shaw Ln., Room 7<br />
              East Lansing, MI 48824-1121<br />
              USA<br />
              PHONE: 517.353.4336<br />
              WEB: ibc.msu.edu<br />
              EMAIL: ibc@msu.edu
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Team;
