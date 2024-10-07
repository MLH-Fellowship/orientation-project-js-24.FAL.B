import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    marginBottom: 6,
  },
  text: {
    marginBottom: 4,
  },
});

// Functional component for the Resume Document
function ResumeDocument({ experience, education, skills, personal_info }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.header}>
            {personal_info?.fullname || "Full Name"}
          </Text>
          <Text>
            {personal_info?.phone_number || "Phone"} |{" "}
            {personal_info?.email || "Email"}
          </Text>
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Education</Text>
          {education?.length > 0 ? (
            education.map((edu, index) => (
              <View key={index}>
                <Text style={styles.text}>
                  {edu.uni_name} – {edu.major}
                </Text>
                <Text>Graduation Date: {edu.graduation_date}</Text>
                <Text>GPA: {edu.gpa}</Text>
              </View>
            ))
          ) : (
            <Text>No education data</Text>
          )}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Skills</Text>
          {skills?.length > 0 ? (
            skills.map((skill, index) => (
              <Text key={index} style={styles.text}>
                {skill.skill_name} – {skill.proficiency}
              </Text>
            ))
          ) : (
            <Text>No skills data</Text>
          )}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Experience</Text>
          {experience?.length > 0 ? (
            experience.map((exp, index) => (
              <View key={index}>
                <Text style={styles.text}>
                  {exp.title} at {exp.company_name}
                </Text>
                <Text>
                  {exp.start_time} - {exp.end_time}
                </Text>
                <Text>• {exp.description}</Text>
              </View>
            ))
          ) : (
            <Text>No experience data</Text>
          )}
        </View>
      </Page>
    </Document>
  );
}

// Component for the Resume page and PDF download link
function ResumePage({ experience, education, skills, personal_info }) {
  return (
    <button>
      <PDFDownloadLink
        document={
          <ResumeDocument
            experience={experience}
            education={education}
            skills={skills}
            personal_info={personal_info}
          />
        }
        fileName="Nhan_Tri_Danh_Resume.pdf"
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Export")}
      </PDFDownloadLink>
    </button>
  );
}

export default ResumePage;
