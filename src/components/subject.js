
import { useState } from "react";
import { HStack, Select, Input, Button, IconButton, Box } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const standards = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];

const subjectsByStandard = {
    "1st": ["Physics", "Maths", "Chemistry"],
    "2nd": ["Physics", "Maths", "Chemistry"],
    "3rd": ["Physics", "Maths", "Chemistry"],
    "4th": ["Physics", "Maths", "Chemistry"],
    "5th": ["Physics", "Maths", "Chemistry"],
    "6th": ["Physics", "Maths", "Chemistry"],
    "7th": ["Physics", "Maths", "Chemistry"],
    "8th": ["Physics", "Maths", "Chemistry"],
    "9th": ["Physics", "Maths", "Chemistry"],
    "10th": ["Physics", "Maths", "Chemistry"],
};

let chaptersBySubject = {
    Maths: ["Chapter 1 Algebra", "Chapter 2 Geometry", "Chapter 3 Trigonometry"],
    Physics: ["Chapter 1 Magnetism", "Chapter 2 Electricity ", "Chapter 3 Quantum"],
    Chemistry: ["Chapter 1 Nuclear", "Chapter 2 Reactions", "Chapter 3 Kinetics"],
};

function Syllabus() {
    const initialSubjects = {
        physics: [
            {
                name: "Magnetism",
                topics: ["Newton's Laws", "Work and Energy", "Rotational Motion"],
            },
            {
                name: "Electricity",
                topics: ["Laws of Thermodynamics", "Heat Engines", "Entropy"],
            },
            {
                name: "Quantum",
                topics: ["Laws of Thermodynamics", "Heat Engines", "Entropy"],
            },
        ],
        chemistry: [
            {
                name: "Nuclear",
                topics: ["Hydrocarbons", "Alcohols", "Ethers"],
            },
            {
                name: "Reactions",
                topics: ["Acids and Bases", "Metals and Non-Metals", "Periodic Table"],
            },
            {
                name: "Kinetics",
                topics: ["Acids and Bases", "Metals and Non-Metals", "Periodic Table"],
            },
        ],
        maths: [
            {
                name: "Algebra",
                topics: ["Linear Equations", "Quadratic Equations", "Matrices"],
            },
            {
                name: "Geometry",
                topics: ["Limits and Continuity", "Differentiation", "Integration"],
            },
            {
                name: "Trigonometry",
                topics: ["Limits and Continuity", "Differentiation", "Integration"],
            },
        ],
    };
    const [selectedStandard, setSelectedStandard] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedChapter, setSelectedChapter] = useState("");
    const [Chapters, setChapters] = useState("initialSubjects");
    const [editingChapter, setEditingChapter] = useState(false);
    const [newChapterName, setNewChapterName] = useState("");

    const handleStandardChange = (event) => {
        setSelectedStandard(event.target.value);
        setSelectedSubject("");
        setSelectedChapter("");
        setEditingChapter(false);
        setNewChapterName("");
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        setSelectedChapter("");
        setEditingChapter(false);
        setNewChapterName("");
    };

    const handleChapterChange = (event) => {
        setSelectedChapter(event.target.value);
        setEditingChapter(false);
        setNewChapterName("");
    };

    const handleEditChapter = () => {
        setEditingChapter(true);
        setNewChapterName(selectedChapter);
    };

    const handleCancelEditChapter = () => {
        setEditingChapter(false);
        setNewChapterName("");
    };

    const handleUpdateChapter = () => {
        const updatedChapters = { ...chaptersBySubject };
        updatedChapters[selectedSubject] = updatedChapters[selectedSubject].map(
            (chapter) => (chapter === selectedChapter ? newChapterName : chapter)
        );
        setEditingChapter(false);
        setNewChapterName("");
        setSelectedChapter(newChapterName);
        chaptersBySubject = updatedChapters;
    };

    const handleAddChapter = () => {
        const updatedChapters = { ...chaptersBySubject };
        updatedChapters[selectedSubject].push(newChapterName);
        setNewChapterName("");
        chaptersBySubject = updatedChapters;
    };

    const handleDeleteChapter = () => {
        const updatedChapters = { ...chaptersBySubject };
        const index = updatedChapters[selectedSubject].indexOf(selectedChapter);
        updatedChapters[selectedSubject].splice(index, 1);
        setEditingChapter(false);
        setNewChapterName("");
        setSelectedChapter("");
        chaptersBySubject = updatedChapters;
    };

    return (
        <HStack align="center" spacing={20} ml="630px" mt="10px">
            <Box>
                <Select placeholder="Select Standard" value={selectedStandard} onChange={handleStandardChange} >
                    {standards.map((standard) => (
                        <option key={standard} value={standard}>
                            {standard}
                        </option>
                    ))}
                </Select>
            </Box>

            {selectedStandard && (
                <Box >
                    <Select placeholder="Select Subject" value={selectedSubject} onChange={handleSubjectChange} >
                        {subjectsByStandard[selectedStandard].map((subject) => (
                            <option key={subject} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </Select>
                </Box>
            )}

            {selectedSubject && (
                <>
                    <Box >
                        <Select placeholder="Select Chapter" value={selectedChapter} onChange={handleChapterChange} >
                            {chaptersBySubject[selectedSubject].map((chapter) => (
                                <option key={chapter} value={chapter}>
                                    {chapter}
                                </option>
                            ))}
                        </Select>
                    </Box>

                    {selectedChapter && (
                        <Box align="center" mt={4}>
                            <IconButton
                                icon={<FaEdit />} aria-label="Edit chapter" mr={2} onClick={handleEditChapter} />
                            <IconButton
                                icon={<FaTrash />} aria-label="Delete chapter" mr={2} onClick={handleDeleteChapter} />
                            {editingChapter ? (
                                <>
                                    <Input value={newChapterName} onChange={(e) => setNewChapterName(e.target.value)} width="200px" textAlign="center" mr={2} />
                                    <Button onClick={handleUpdateChapter} mr={2}>
                                        Update
                                    </Button>
                                    <Button onClick={handleCancelEditChapter}>Cancel</Button>
                                </>
                            ) : (
                                <></>
                            )}
                        </Box>
                    )}

                    {!editingChapter && (
                        <Box align="center" mt={4}>
                            <Input value={newChapterName} onChange={(e) => setNewChapterName(e.target.value)} placeholder="New Chapter Name" width="200px" textAlign="center" mr={2} />
                            <Button onClick={handleAddChapter}>Add Chapter</Button>
                        </Box>
                    )}
                </>
            )}
        </HStack>
    );
}

export default Syllabus;