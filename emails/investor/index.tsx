import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Hr,
  Column,
} from "@react-email/components";
import * as React from "react";

interface EmailInvestorStatusProps {
  message: { id: string; title: string; description: string }[];
  status: "approved" | "rejected";
  loginDate?: Date;
  profileImage: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  birthDate: string;
  email: string
  nationality: string;
  networth: number;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const EmailInvestorStatus = ({
  loginDate,
  message,
  status,
  profileImage,
  firstName,
  lastName,
  nationalId,
  birthDate,
  email,
  nationality,
  networth,
}: EmailInvestorStatusProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(loginDate);

  return (
    <Html>
      <Head />
      <Preview>Company Registration Status</Preview>
      <Body style={main}>
        <Container>
          {/* Main Content Section */}
          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={100}
                src="https://raw.githubusercontent.com/B2D-Venture/b2d-venture/refs/heads/iteration-7/app/favicon.ico"
                alt="B2D Logo Content"
                className="flex justify-center items-center"
              />
            </Row>

            <Heading style={heading}>
              {status.charAt(0).toUpperCase()}{status.slice(1)} Investor Creation
            </Heading>

            <Row>
              <Text style={subHeading}>
                Your investor registration has been&nbsp;
                <span
                  style={{
                    color: status === "approved" ? "green" : "#D91656",
                  }}
                >
                  {status}
                </span>.
              </Text>
            </Row>

            {status === "rejected" ? (
              <div>
                {/* Instruction */}
                <Row>
                  <Text style={instructions}>
                    Unfortunately, your investor profile did not meet our requirements. Please review the information below
                    and update the necessary details.
                  </Text>
                </Row>
                <Row>
                  <Text style={instructions}>
                    you cannot create your investor profile due to the following issues:
                  </Text>
                </Row>
                {message.map((msg) => (
                  <Row key={msg.id}>
                    <ul>
                      <li>
                        <Text style={{
                          fontSize: 16,
                          color: '#777',
                          marginBottom: '10px',
                          textAlign: "left",
                          lineHeight: '1.5'
                        }}>
                          <strong>{msg.title}</strong>
                          <br />
                          {msg.description}
                        </Text>
                      </li>
                    </ul>
                  </Row>
                ))}
                <Row>
                  <Text style={{ ...paragraph, textAlign: "center", marginTop: "20px" }}>
                    Please make the necessary changes and submit your information for approve.
                  </Text>
                </Row>
                <Row>
                  <Column style={{
                    display: "flex",
                    justifyContent: "center",
                  }}>
                    <Button
                      style={{
                        ...button,
                        display: 'inline-block',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '4px',
                      }}
                    >
                      Create Your Investor Again
                    </Button>
                  </Column>
                </Row>
              </div>
            )
              : (
                <div>
                  <Row style={{ ...boxInfos, paddingTop: "20px", textAlign: "center" }}>
                    <Text style={instructions}>
                      Your investor profile has been successfully created.
                    </Text>
                    <Text style={instructions}>
                      You can now view your investor profile through the link below.
                    </Text>
                  </Row>
                  <Row>
                    <Column style={{
                      display: "flex",
                      justifyContent: "center",
                    }} colSpan={3}>
                      <Button
                        style={{
                          ...button,
                          display: 'inline-block',
                          color: '#fff',
                          textDecoration: 'none',
                          borderRadius: '4px',
                        }}
                      >
                        See Investor Profile
                      </Button>
                    </Column>
                  </Row>
                </div>
              )
            }

            <Hr />

            {/* Investor Information */}
            <div
              style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px',
                margin: '20px auto',
                textAlign: 'center'
              }}
            >
              <Img
                style={{
                  display: 'block',
                  margin: '0 auto',
                  border: '4px solid #A66E38',
                  width: '140px',
                  height: '140px',
                  marginTop: '10px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
                src={profileImage}
                alt="Investor Profile Image"
              />
              <Text
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#A66E38',
                  marginTop: '15px',
                  wordWrap: 'break-word',
                }}
              >
                {email}
              </Text>
              <Text
                style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#333',
                  marginTop: '15px',
                }}
              >
                {firstName} {lastName}
              </Text>
              <Text
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#555',
                  marginTop: '10px',
                }}
              >
                National ID: {nationalId}
              </Text>
              <Text
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#555',
                  marginTop: '10px',
                }}
              >
                Date of Birth: {birthDate}
              </Text>
              <Text
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#555',
                  marginTop: '10px',
                }}
              >
                Nationality: {nationality}
              </Text>
              <Text
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#555',
                  marginTop: '10px',
                }}
              >
                Networth: {networth}
              </Text>
            </div>
          </Section>

          {/* Footer Section */}
          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src="https://react-email-demo-3kjjfblod-resend.vercel.app/static/yelp-footer.png"
              alt="Company Footer"
            />
          </Section>

          {/* Footer Text */}
          <Text
            style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#999',
              marginTop: '20px',
            }}
          >
            © 2024 | B2D Venture, Bangkok | www.b2d-venture.com
          </Text>
        </Container>
      </Body >
    </Html >
  );
};

EmailInvestorStatus.PreviewProps = {
  message: [
    { id: "message1", title: "Incorrect Profile Image", description: "The uploaded profile image does not match the investor." },
    { id: "message2", title: "Incorrect Name", description: "The name provided does not match the investor." },
    { id: "message3", title: "Incorrect Nationality", description: "The Nationality provided is incorrect." },
  ],
  // status: "approved",
  status: "rejected",
  profileImage: "https://images.squarespace-cdn.com/content/v1/656f4e4dababbd7c042c4946/82bec838-05c8-4d68-b173-2284a6ad4e52/how-to-stop-being-a-people-pleaser",
  firstName: "Steve",
  lastName: "Jobs",
  nationalId: "123456789",
  birthDate: "1990-01-01",
  email: "hellotest1234@gmail.com",
  nationality: "Thailand",
  networth: 1000000,
} as unknown as EmailInvestorStatusProps;

export default EmailInvestorStatus;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

import { Properties } from 'csstype';

const heading: Properties<string | number> = {
  fontSize: 36,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
  textAlign: "center" as Properties['textAlign']
}

const subHeading: Properties<string | number> = {
  fontSize: 20,
  fontWeight: '500',
  color: '#555',
  marginBottom: '10px',
  textAlign: "center"
}

const instructions: Properties<string | number> = {
  fontSize: 16,
  color: '#777',
  marginBottom: '10px',
  textAlign: "center",
  lineHeight: '1.5'
}

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#A66E38",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
  marginBottom: "10px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
  padding: "10px",
};

const image = {
  maxWidth: "100%",
  margin: '0 auto',
  marginTop: '20px',
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};

const pitchStyle: Properties<string | number> = {
  backgroundColor: '#f1f1f1',
  padding: '15px',
  borderRadius: '8px',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  overflowWrap: 'break-word',
  margin: '0 0 10px 0',
};
