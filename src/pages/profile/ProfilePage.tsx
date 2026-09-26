import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";

import {
  useMyProfile,
  useUpdateMyProfile,
  useMyExperiences,
  useMyProgress,
  useMyLearningSessions,
  useMyEducationalContent,
  useUserRatings,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
  useCreateEducationalContent,
  useUpdateEducationalContent,
  useDeleteEducationalContent,
  useMyInterests,
  useAddMyInterest,
  useRemoveMyInterest,
} from "../../hooks/useProfile";

import type {
  ExperienceResponse,
  EducationalContentResponse,
} from "../../api/profile";

import { useProfileSkills } from "../../hooks/useProfileSkills";

import {
  useLearningDirections,
  useSkills,
} from "../../hooks/useLearningDirections";

import ProfileHeader from "./components/ProfileHeader";
import ProfileStats from "./components/ProfileStats";
import ProfileAbout from "./components/ProfileAbout";
import ProfileTabs, { type ProfileTab } from "./components/ProfileTabs";
import ProfileSkillsSection from "./components/ProfileSkillsSection";
import ProfileReviews from "./components/ProfileReviews";
import ProfileContent from "./components/ProfileContent";
import ProfileExperiences from "./components/ProfileExperiences";
import ProfileProgress from "./components/ProfileProgress";
import ProfileSessions from "./components/ProfileSessions";
import EditProfileModal from "./components/EditProfileModal";
import EditSkillsModal from "./components/EditSkillsModal";
import ExperienceModal, {
  type ExperienceFormState,
} from "./components/ExperienceModal";
import ContentModal, {
  type ContentFormState,
} from "./components/ContentModal";

export interface ProfileFormState {
  firstName: string;
  lastName: string;
  bio: string;
  university: string;
}

export default function ProfilePage() {
  const { t } = useTranslation();

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useMyProfile();

  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateMyProfile();

  // Only used to resolve the display name in ProfileStats.
  // Learning direction editing lives in ProfileHeader.
  const { data: learningDirections = [] } = useLearningDirections();

  // Single catalog of 12 topics — used for both skills and interests.
  const {
    data: allSkills = [],
    isLoading: allSkillsLoading,
  } = useSkills();

  const {
    profileSkills,
    isLoading: profileSkillsLoading,
    addSkill,
    removeSkill,
    isAdding,
    isRemoving,
  } = useProfileSkills();

  const {
    data: profileInterests = [],
    isLoading: profileInterestsLoading,
  } = useMyInterests();

  const {
    mutateAsync: addInterest,
    isPending: isAddingInterest,
  } = useAddMyInterest();

  const {
    mutateAsync: removeInterest,
    isPending: isRemovingInterest,
  } = useRemoveMyInterest();

  const {
    data: ratings = [],
    isLoading: ratingsLoading,
    isError: ratingsError,
  } = useUserRatings(profile?.userId);

  const {
    data: content = [],
    isLoading: contentLoading,
    isError: contentError,
  } = useMyEducationalContent();

  const {
    data: experiences = [],
    isLoading: experiencesLoading,
    isError: experiencesError,
  } = useMyExperiences();

  const {
    data: progress = [],
    isLoading: progressLoading,
    isError: progressError,
  } = useMyProgress();

  const {
    data: sessions = [],
    isLoading: sessionsLoading,
    isError: sessionsError,
  } = useMyLearningSessions();

  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();

  const createContent = useCreateEducationalContent();
  const updateContent = useUpdateEducationalContent();
  const deleteContent = useDeleteEducationalContent();

  const [activeTab, setActiveTab] = useState<ProfileTab>("skills");

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditSkillsOpen, setIsEditSkillsOpen] = useState(false);

  const [skillSearch, setSkillSearch] = useState("");

  const [form, setForm] = useState<ProfileFormState>({
    firstName: "",
    lastName: "",
    bio: "",
    university: "",
  });

  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

  const [editingExperience, setEditingExperience] =
    useState<ExperienceResponse | null>(null);

  const [experienceForm, setExperienceForm] =
    useState<ExperienceFormState>({
      title: "",
      description: "",
    });

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

  const [editingContent, setEditingContent] =
    useState<EducationalContentResponse | null>(null);

  const [contentForm, setContentForm] = useState<ContentFormState>({
    title: "",
    description: "",
    contentType: "",
    contentUrl: "",
  });

  const firebaseUser = getAuth().currentUser;

  const displayName = useMemo(() => {
    if (!profile) return "";
    return `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim();
  }, [profile]);

  const initials = useMemo(() => {
    if (!displayName) return "?";
    return displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  }, [displayName]);

  // Resolve name for stats from learning-directions list if available,
  // otherwise fall back to skills list (same 12 topics).
  const currentLearningDirection = useMemo(() => {
    const id = profile?.learningDirectionId;
    if (!id) return undefined;

    return (
      learningDirections.find((d) => d.id === id) ??
      allSkills.find((s) => s.id === id)
    );
  }, [learningDirections, allSkills, profile?.learningDirectionId]);

  const profileSkillIds = useMemo(
    () => new Set(profileSkills.map((skill) => skill.id)),
    [profileSkills]
  );

  const profileInterestIds = useMemo(
    () => new Set(profileInterests.map((interest) => interest.id)),
    [profileInterests]
  );

  // Same 12 topics for skills picker
  const filteredSkills = useMemo(() => {
    const query = skillSearch.trim().toLowerCase();
    if (!query) return allSkills;
    return allSkills.filter((skill) =>
      skill.name?.toLowerCase().includes(query)
    );
  }, [allSkills, skillSearch]);

  // Same 12 topics for interests picker
  const filteredInterests = useMemo(() => {
    const query = skillSearch.trim().toLowerCase();
    if (!query) return allSkills;
    return allSkills.filter((skill) =>
      skill.name?.toLowerCase().includes(query)
    );
  }, [allSkills, skillSearch]);

  const openEditProfile = () => {
    if (!profile) return;

    setForm({
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      bio: profile.bio ?? "",
      university: profile.university ?? "",
    });

    setIsEditProfileOpen(true);
  };

  const openEditSkills = () => {
    setSkillSearch("");
    setIsEditSkillsOpen(true);
  };

  const handleProfileSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateProfile(form);
    setIsEditProfileOpen(false);
  };

  const handleAddSkill = async (skillId: string) => {
    if (profileSkillIds.has(skillId)) return;
    await addSkill(skillId);
  };

  const handleRemoveSkill = async (skillId: string) => {
    await removeSkill(skillId);
  };

  const handleAddInterest = async (interestId: string) => {
    if (profileInterestIds.has(interestId)) return;
    await addInterest(interestId);
  };

  const handleRemoveInterest = async (interestId: string) => {
    await removeInterest(interestId);
  };

  const openCreateExperience = () => {
    setEditingExperience(null);
    setExperienceForm({ title: "", description: "" });
    setIsExperienceModalOpen(true);
  };

  const openEditExperience = (exp: ExperienceResponse) => {
    setEditingExperience(exp);
    setExperienceForm({
      title: exp.title ?? "",
      description: exp.description ?? "",
    });
    setIsExperienceModalOpen(true);
  };

  const handleExperienceSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      title: experienceForm.title.trim() || null,
      description: experienceForm.description.trim() || null,
    };

    if (editingExperience) {
      await updateExperience.mutateAsync({
        id: editingExperience.id,
        payload,
      });
    } else {
      await createExperience.mutateAsync(payload);
    }

    setIsExperienceModalOpen(false);
    setEditingExperience(null);
  };

  const handleDeleteExperience = async (id: string) => {
    const confirmed = window.confirm(
      t("profile.experiences.deleteConfirm")
    );
    if (!confirmed) return;
    await deleteExperience.mutateAsync(id);
  };

  const openCreateContent = () => {
    setEditingContent(null);
    setContentForm({
      title: "",
      description: "",
      contentType: "",
      contentUrl: "",
    });
    setIsContentModalOpen(true);
  };

  const openEditContent = (item: EducationalContentResponse) => {
    setEditingContent(item);
    setContentForm({
      title: item.title ?? "",
      description: item.description ?? "",
      contentType: item.contentType ?? "",
      contentUrl: item.contentUrl ?? "",
    });
    setIsContentModalOpen(true);
  };

  const handleContentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      title: contentForm.title.trim() || null,
      description: contentForm.description.trim() || null,
      contentType: contentForm.contentType.trim() || null,
      contentUrl: contentForm.contentUrl.trim() || null,
    };

    if (editingContent) {
      await updateContent.mutateAsync({
        id: editingContent.id,
        payload,
      });
    } else {
      await createContent.mutateAsync(payload);
    }

    setIsContentModalOpen(false);
    setEditingContent(null);
  };

  const handleDeleteContent = async (id: string) => {
    const confirmed = window.confirm(
      t("profile.content.deleteConfirm")
    );
    if (!confirmed) return;
    await deleteContent.mutateAsync(id);
  };

  if (profileLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background px-4 py-8 text-text-primary sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="h-72 animate-pulse rounded-3xl bg-surface-2" />
          <div className="h-16 animate-pulse rounded-2xl bg-surface-2" />
          <div className="h-80 animate-pulse rounded-3xl bg-surface-2" />
        </div>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 text-text-primary">
        <div className="mx-auto max-w-xl rounded-3xl border border-error/30 bg-error-soft p-6 text-center">
          <h1 className="text-lg font-bold">
            {t("profile.error.title")}
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            {t("profile.error.description")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background text-text-primary">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-card">
          <ProfileHeader
            displayName={displayName}
            initials={initials}
            photoURL={firebaseUser?.photoURL}
            email={firebaseUser?.email}
            university={profile.university}
            onEditProfile={openEditProfile}
          />

          <div className="relative px-5 pb-6 sm:px-8 sm:pb-8">
            <ProfileStats
              points={profile.points}
              skillsCount={profileSkills.length}
              learningDirectionName={currentLearningDirection?.name}
            />

            <ProfileAbout bio={profile.bio} onEdit={openEditProfile} />
          </div>
        </section>

        <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "skills" && (
          <ProfileSkillsSection
            profileSkills={profileSkills}
            profileSkillsLoading={profileSkillsLoading}
            profileInterests={profileInterests}
            profileInterestsLoading={profileInterestsLoading}
            onEditSkills={openEditSkills}
          />
        )}

        {activeTab === "reviews" && (
          <ProfileReviews
            ratings={ratings}
            isLoading={ratingsLoading}
            isError={ratingsError}
          />
        )}

        {activeTab === "content" && (
          <div className="mt-6">
            <ProfileContent
              content={content}
              isLoading={contentLoading}
              isError={contentError}
              onAdd={openCreateContent}
              onEdit={openEditContent}
              onDelete={handleDeleteContent}
              isDeleting={deleteContent.isPending}
            />
          </div>
        )}

        {activeTab === "history" && (
          <div className="mt-6 space-y-6">
            <ProfileProgress
              progress={progress}
              isLoading={progressLoading}
              isError={progressError}
            />

            <ProfileExperiences
              experiences={experiences}
              isLoading={experiencesLoading}
              isError={experiencesError}
              onAdd={openCreateExperience}
              onEdit={openEditExperience}
              onDelete={handleDeleteExperience}
              isDeleting={deleteExperience.isPending}
            />

            <ProfileSessions
              sessions={sessions}
              isLoading={sessionsLoading}
              isError={sessionsError}
            />
          </div>
        )}
      </main>

      {isEditProfileOpen && (
        <EditProfileModal
          form={form}
          setForm={setForm}
          isUpdating={isUpdating}
          onClose={() => setIsEditProfileOpen(false)}
          onSubmit={handleProfileSubmit}
        />
      )}

      {isEditSkillsOpen && (
        <EditSkillsModal
          skillSearch={skillSearch}
          onSkillSearchChange={setSkillSearch}
          profileSkills={profileSkills}
          filteredSkills={filteredSkills}
          profileSkillIds={profileSkillIds}
          profileInterests={profileInterests}
          filteredInterests={filteredInterests}
          profileInterestIds={profileInterestIds}
          skillsLoading={profileSkillsLoading || allSkillsLoading}
          interestsLoading={
            profileInterestsLoading || allSkillsLoading
          }
          isAdding={isAdding}
          isRemoving={isRemoving}
          isAddingInterest={isAddingInterest}
          isRemovingInterest={isRemovingInterest}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
          onAddInterest={handleAddInterest}
          onRemoveInterest={handleRemoveInterest}
          onClose={() => setIsEditSkillsOpen(false)}
        />
      )}

      {isExperienceModalOpen && (
        <ExperienceModal
          mode={editingExperience ? "edit" : "create"}
          form={experienceForm}
          setForm={setExperienceForm}
          isSaving={
            createExperience.isPending || updateExperience.isPending
          }
          onClose={() => {
            setIsExperienceModalOpen(false);
            setEditingExperience(null);
          }}
          onSubmit={handleExperienceSubmit}
        />
      )}

      {isContentModalOpen && (
        <ContentModal
          mode={editingContent ? "edit" : "create"}
          form={contentForm}
          setForm={setContentForm}
          isSaving={
            createContent.isPending || updateContent.isPending
          }
          onClose={() => {
            setIsContentModalOpen(false);
            setEditingContent(null);
          }}
          onSubmit={handleContentSubmit}
        />
      )}
    </div>
  );
}