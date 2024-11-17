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

interface EmailCompanyStatusProps {
  message: { id: string; title: string; description: string }[];
  status: "approved" | "rejected";
  loginDate?: Date;
  logo: string;
  banner: string;
  name: string;
  abbr: string;
  description: string;
  pitch: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const YelpRecentLoginEmail = ({
  name,
  loginDate,
  logo,
  banner,
  abbr,
  description,
  pitch,
  message,
  status,
}: EmailCompanyStatusProps) => {
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
                src="https://cdn.discordapp.com/attachments/1270611997393817683/1298894385928339476/b2d-logo.png?ex=671c8aa9&is=671b3929&hm=9a7ad43bb20aa4b1dede9a39d3470ba4253153892ff30cd4e2e8575feda87f44&"
                alt="B2D Logo Content"
                className="flex justify-center items-center"
              />
            </Row>

            <Heading style={heading}>
              {status.charAt(0).toUpperCase()}{status.slice(1)} Company Creation
            </Heading>

            <Row>
              <Text style={subHeading}>
                Your company registration has been&nbsp;
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
                    Unfortunately, your company profile did not meet our requirements. Please review the information below
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
                      Create Your Company Again
                    </Button>
                  </Column>
                </Row>
              </div>
            )
              : (
                <div>
                  <Row style={{ ...boxInfos, paddingTop: "20px", textAlign: "center" }}>
                    <Text style={instructions}>
                      Your company profile has been successfully created.
                    </Text>
                    <Text style={instructions}>
                      You can now view your company profile through the link below.
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
                        See Company Profile
                      </Button>
                    </Column>
                  </Row>
                </div>
              )}

            <Hr />

            <div>
              <Img
                style={image}
                width="700px"
                src={banner}
                alt="Company Banner"
              />
              <Img
                style={{
                  display: 'block',
                  margin: '0 auto',
                  border: '2px solid #000',
                  width: '140px',
                  height: '140px',
                  marginTop: '10px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
                src={logo}
                alt="Company Logo"
              />
              <Text style={{ ...paragraph, textAlign: "center", marginTop: "20px", fontSize: 30, fontWeight: "bold", }}>
                {name} ({abbr})
              </Text>
              <Text style={{ ...paragraph, textAlign: "center", marginTop: "20px", fontSize: 20, fontWeight: "semibold" }}>
                {description}
              </Text>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: pitch }}
              style={pitchStyle}
            />
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

YelpRecentLoginEmail.PreviewProps = {
  message: [
    { id: "message1", title: "Incorrect Logo", description: "The uploaded logo does not match the official company logo." },
    { id: "message2", title: "Incorrect Banner", description: "The uploaded banner does not meet branding guidelines." },
    { id: "message3", title: "Incorrect Company Name", description: "The company name is misspelled or incorrect." },
    { id: "message4", title: "Incorrect Company Abbreviation", description: "The company abbreviation is incorrect." },
    { id: "message5", title: "Inaccurate Company Description", description: "The description does not accurately represent the company profile." },
    { id: "message6", title: "Inaccurate Pitch Information", description: "The pitch does not reflect the correct product details." },
  ],
  // status: "approved",
  status: "rejected",
  name: "Alan",
  logo: "https://utfs.io/f/EDwc07VFqTZJhmd9HKMFNCBQjAuL6IGXUMqVeOptDxTdaHyo",
  banner: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/corporate-business-banner-template-design-a1bfc99717878c32d065d97fa71faaf3_screen.jpg?ts=1573704599",
  abbr: "CPL",
  description: "Connecting people with great local businesses. Connecting people with great local businesses. Connecting people with great local businesses. Connecting people with great local businesses",
  pitch: "Connecting people with great local businesses. Connecting people with great local businesses. Connecting people with great local businesses. Connecting people with great local businesses",
} as unknown as EmailCompanyStatusProps;

export default YelpRecentLoginEmail;

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
