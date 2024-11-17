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
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface EmailDataroomStatusProps {
    message: { id: string; title: string; description: string }[];
    status: "approved" | "rejected";
    loginDate?: Date;
    company: Company;
    investorProfile: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const DataroomEmail = ({
    loginDate,
    message,
    status,
    company,
    investorProfile,
}: EmailDataroomStatusProps) => {
    const formattedDate = new Intl.DateTimeFormat("en", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(loginDate);

    return (
        <Html>
            <Head />
            <Preview>Dataroom Request Status</Preview>
            <Tailwind>
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
                                {status.charAt(0).toUpperCase()}{status.slice(1)} Dataroom Request
                            </Heading>

                            <Row>
                                <Text style={subHeading}>
                                    Your dataroom request has been&nbsp;
                                    <span
                                        style={{
                                            color: status === "approved" ? "green" : "#D91656",
                                        }}
                                    >
                                        {status}&nbsp;
                                    </span>
                                    <span>
                                        by {company.name} on {formattedDate}.
                                    </span>
                                </Text>
                            </Row>

                            {status === "rejected" ? (
                                <div>
                                    <Row>
                                        <Text style={instructions}>
                                            Unfortunately, your dataroom request did not meet our requirements.
                                        </Text>
                                    </Row>
                                    <Section className="my-4">
                                        <Row>
                                            <Column align="right">
                                                <Img
                                                    className="rounded-full"
                                                    src={company.logo}
                                                    width="70"
                                                    height="70"
                                                />
                                            </Column>
                                            <Column align="center">
                                                <Img
                                                    src="https://media.istockphoto.com/id/1423112183/es/vector/icono-del-bot%C3%B3n-cerrar.jpg?s=612x612&w=0&k=20&c=gaJRJNav4LR5IpKpM-xgWFX0AA1V3wLStEny7tIxcos="
                                                    width="20"
                                                    height="20"
                                                    alt="invited you to"
                                                />
                                            </Column>
                                            <Column align="left">
                                                <Img
                                                    className="rounded-full"
                                                    src={investorProfile}
                                                    width="70"
                                                    height="70"
                                                />
                                            </Column>
                                        </Row>
                                    </Section>
                                    <Row>
                                        <Text style={instructions}>
                                            You cannot access the dataroom due to the following issues:
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
                                </div>
                            ) : (
                                <div>
                                    <Row style={{ ...boxInfos, paddingTop: "20px", textAlign: "center" }}>
                                        <Text style={instructions}>
                                            Congratulations! Your dataroom request has been successfully.
                                            {company.name} has approve dataroom request you to view.
                                        </Text>
                                        <Section>
                                            <Row>
                                                <Column align="right">
                                                    <Img
                                                        className="rounded-full"
                                                        src={company.logo}
                                                        width="70"
                                                        height="70"
                                                    />
                                                </Column>
                                                <Column align="center">
                                                    <Img
                                                        src="https://static.thenounproject.com/png/3092173-200.png"
                                                        width="20"
                                                        height="20"
                                                        alt="invited you to"
                                                    />
                                                </Column>
                                                <Column align="left">
                                                    <Img
                                                        className="rounded-full"
                                                        src={investorProfile}
                                                        width="70"
                                                        height="70"
                                                    />
                                                </Column>
                                            </Row>
                                        </Section>
                                        <Text style={instructions} className="mb-4">
                                            You can now view company dataroom through the link below.
                                        </Text>
                                        <Row>
                                            <Column style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}>
                                                <Button
                                                    style={{
                                                        ...button,
                                                        color: '#fff',
                                                        textDecoration: 'none',
                                                        borderRadius: '4px',
                                                    }}
                                                >
                                                    View Dataroom
                                                </Button>
                                            </Column>
                                        </Row>
                                    </Row>

                                </div>
                            )}
                        </Section>

                        {/* Footer Section */}
                        <Section style={containerImageFooter}>
                            <Img
                                style={image}
                                width={620}
                                src="https://react-email-demo-3kjjfblod-resend.vercel.app/static/yelp-footer.png"
                                alt="Footer"
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
            </Tailwind>
        </Html >
    );
};


DataroomEmail.PreviewProps = {
    message: [
        { id: "message1", title: "Access Level Insufficient", description: "Your current access level does not permit viewing this document." },
        { id: "message2", title: "Confidential Document", description: "This document contains sensitive information and is restricted to approved investors only." },
    ],
    status: "approved",
    // status: "rejected",
    company: {
        name: "Amazon",
        logo: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        banner: "https://react-email-demo-3kjjfblod-resend.vercel.app/static/yelp-footer.png",
        abbr: "AMZ",
        description: "Amazon is a venture capital firm that invests in early-stage startups.",
        pitch: "<p>We invest in innovative startups that are disrupting the market and creating value for customers.</p>",
    },
    investorProfile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3m972e8FEvBi7ETC03avlJcZDg8nT9dWLSw&s",
} as unknown as EmailDataroomStatusProps;

export default DataroomEmail;

const main = {
    backgroundColor: "#fff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

import { Properties } from 'csstype';
import { Company } from "@/types/company";

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
    marginBottom: '5px',
    textAlign: "center",
    lineHeight: '1.5'
}

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
