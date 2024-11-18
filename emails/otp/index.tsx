import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface PlaidVerifyIdentityEmailProps {
    validationCode: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const PlaidVerifyIdentityEmail = ({
    validationCode,
}: PlaidVerifyIdentityEmailProps) => (
    <Html>
        <Head />
        <Body style={main}>
            <Container style={container}>
                <Img
                    style={image}
                    width={100}
                    src="https://cdn.discordapp.com/attachments/1270611997393817683/1298894385928339476/b2d-logo.png?ex=671b3929&is=6719e7a9&hm=91ab0a3fbfe7afe1f6ffb99549ec3dc1e7fcd5b00448db652cbb5af3ff5b3fa1&"
                    alt="B2D Logo Content"
                    className="flex justify-center items-center"
                />
                <Text style={tertiary}>Verify Your Identity</Text>
                <Heading style={secondary}>
                    Enter the following code to finish Sign Up B2D Venture.
                </Heading>
                <Section style={codeContainer}>
                    <Text style={code}>{validationCode}</Text>
                </Section>
            </Container>
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
        </Body>
    </Html>
);

PlaidVerifyIdentityEmail.PreviewProps = {
    validationCode: "144833",
} as PlaidVerifyIdentityEmailProps;

export default PlaidVerifyIdentityEmail;

const main = {
    backgroundColor: "#ffffff",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #eee",
    borderRadius: "5px",
    boxShadow: "0 5px 10px rgba(20,50,70,.2)",
    marginTop: "20px",
    maxWidth: "360px",
    margin: "0 auto",
    padding: "40px",
};

const logo = {
    margin: "0 auto",
};

const tertiary = {
    color: "#0a85ea",
    fontSize: "11px",
    fontWeight: 700,
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    height: "16px",
    letterSpacing: "0",
    lineHeight: "16px",
    margin: "16px 8px 8px 8px",
    textTransform: "uppercase" as const,
    textAlign: "center" as const,
};

const secondary = {
    color: "#000",
    display: "inline-block",
    fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "24px",
    marginBottom: "0",
    marginTop: "0",
    textAlign: "center" as const,
};

const codeContainer = {
    background: "rgba(0,0,0,.05)",
    borderRadius: "4px",
    margin: "16px auto 14px",
    verticalAlign: "middle",
    width: "280px",
};

const code = {
    color: "#000",
    display: "inline-block",
    fontFamily: "HelveticaNeue-Bold",
    fontSize: "32px",
    fontWeight: 700,
    letterSpacing: "6px",
    lineHeight: "40px",
    paddingBottom: "8px",
    paddingTop: "8px",
    margin: "0 auto",
    width: "100%",
    textAlign: "center" as const,
};

const paragraph = {
    color: "#444",
    fontSize: "15px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    letterSpacing: "0",
    lineHeight: "23px",
    padding: "0 40px",
    margin: "0",
    textAlign: "center" as const,
};

const link = {
    color: "#444",
    textDecoration: "underline",
};

const footer = {
    color: "#000",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0",
    lineHeight: "23px",
    margin: "0",
    marginTop: "20px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    textAlign: "center" as const,
    textTransform: "uppercase" as const,
};

const containerImageFooter = {
    padding: "45px 0 0 0",
};

const image = {
    maxWidth: "100%",
    margin: '0 auto',
    marginTop: '20px',
};
