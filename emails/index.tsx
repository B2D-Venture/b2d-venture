import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface YelpRecentLoginEmailProps {
  message: string;
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
}: YelpRecentLoginEmailProps) => {
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
                src="http://localhost:3001/logo/b2d-logo.png"
                alt="B2D Logo Content"
                className="flex justify-center items-center"
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading style={heading}>
                  Rejected Company Creation
                </Heading>

                <Text style={subHeading}>
                  Your company registration has been <span style={{ color: '#D91656' }}>rejected</span>.
                </Text>

                {/* Instructions */}
                <Row>
                  <Text style={instructions}>
                    Unfortunately, your company profile did not meet our requirements. Please review the information below
                    and update the necessary details.
                  </Text>
                  <Text style={instructions}>
                    You can not create because {message}
                  </Text>
                </Row>

                <Text style={{ ...paragraph, textAlign: "center", marginTop: "20px" }}>
                  Please make the necessary changes and submit your information for approve.
                </Text>

                {/* Action Button */}
                <Row style={{ ...boxInfos, paddingTop: "20px", justifyContent: "center" }}>
                  <Column style={containerButton} colSpan={2}>
                    <Button style={button}>
                      Create Your Company Again
                    </Button>
                  </Column>
                </Row>
                <Hr />

                <div>
                  <Img
                    style={image}
                    width="100%"
                    src={banner}
                    alt="Company Banner"
                  />
                  <Img
                    style={{
                      display: 'block',
                      margin: '0 auto',
                      border: '2px solid #000',
                      width: '17%',
                      marginTop: '10px',
                      borderRadius: '50%',
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
              </Column>
            </Row>
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
      </Body>
    </Html>
  );

};

YelpRecentLoginEmail.PreviewProps = {
  message: "your company pitch is not good",
  name: "Alan",
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOo6QUm_jVtraBc_hltQIeZMq4m_Wv8uTFcg&s",
  banner: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/corporate-business-banner-template-design-a1bfc99717878c32d065d97fa71faaf3_screen.jpg?ts=1573704599",
  abbr: "CPL",
  description: "Connecting people with great local businesses",
  pitch: "<p>dlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkmadlkamlwkdmlawmdklawdmlkamdklamwdlkmadlmawldkmaldwkma</p>",

} as YelpRecentLoginEmailProps;

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
  marginBottom: '20px',
  textAlign: "center"
}

const instructions: Properties<string | number> = {
  fontSize: 16,
  color: '#777',
  marginBottom: '20px',
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
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
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
