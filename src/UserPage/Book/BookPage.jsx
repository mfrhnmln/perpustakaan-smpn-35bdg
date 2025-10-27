import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import BtnScrollTopButton from "../../Function/BtnScrollToTop";

import Sidebar from "../Components/sidebar";
import BookList from "./BookList";

const BookPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [classificationFilter, setClassificationFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState(""); // ⬅️ baru
  const [onlyAvailable, setOnlyAvailable] = useState(false); // ⬅️ baru

  const location = useLocation();
  const { classification } = useParams();

  useEffect(() => {
    if (location.state?.author) {
      setAuthorFilter(location.state.author);
    }
    if (location.state?.subject) {
      setSubjectFilter(location.state.subject);
    }
  }, [location.state]);

  useEffect(() => {
    if (classification) {
      setClassificationFilter(classification);
    }
  }, [classification]);

  return (
    <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-5 md:px-10 py-10">
      {/* Sidebar Filter */}
      <div className="lg:w-1/3">
        <Sidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          subjectFilter={subjectFilter}
          setSubjectFilter={setSubjectFilter}
          authorFilter={authorFilter}
          setAuthorFilter={setAuthorFilter}
          classificationFilter={classificationFilter}
          setClassificationFilter={setClassificationFilter}
          languageFilter={languageFilter}
          setLanguageFilter={setLanguageFilter}
          onlyAvailable={onlyAvailable}
          setOnlyAvailable={setOnlyAvailable}
        />
      </div>

      {/* Daftar Buku */}
      <div className="lg:w-2/3">
        <BookList
          searchQuery={searchQuery}
          subjectFilter={subjectFilter}
          authorFilter={authorFilter}
          classificationFilter={classificationFilter}
          languageFilter={languageFilter}
          onlyAvailable={onlyAvailable}
        />
      </div>

      {/* Tombol Scroll to Top (khusus mobile) */}
      <div className="lg:hidden">
        <BtnScrollTopButton />
      </div>
    </div>
  );
};

export default BookPage;
