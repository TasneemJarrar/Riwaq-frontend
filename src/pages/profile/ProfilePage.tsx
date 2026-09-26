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
  useCreateProgress,
  useUpdateProgress,
  useDeleteProgress,
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
  LearningSessionResponse,
  ProgressResponse,
} from "../../api/profile";

import { useProfileSkills } from "../../hooks/useProfileSkills";
import {
  useLearningDirections,
  useSkills,
} from "../../hooks/useLearningDirections";
import {
  useCreateLearningSession,
  useUpdateLearningSession,
  useRateLearningSession,
} from "../../hooks/useLearningSessions";
import { useAcceptedConnections } from "../../hooks/useConnections";
import { useAuthStore } from "../../store/useAuthStore";

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
import SkillVerificationSection from "./components/SkillVerificationSection";
import EditProfileModal from "./components/EditProfileModal";
import EditSkillsModal from "./components/EditSkillsModal";
import ExperienceModal, {
  type ExperienceFormState,
} from "./components/ExperienceModal";
import ContentModal, {
  type ContentFormState,
} from "./components/ContentModal";
import SessionModal, {
  type SessionFormState,
} from "./components/SessionModal";
import RateSessionModal from "./components/RateSessionModal";
import ProgressModal, {
  type ProgressFormState,
} from "./components/ProgressModal";

export interface ProfileFormState {
  firstName: string;
  lastName: string;
  bio: string;
  university: string;
}

function toDatetimeLocal(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ProfilePage() {
  const { t } = useTranslation();
  const myUserId = useAuthStore((s) => s.user?.userId);

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useMyProfile();

  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateMyProfile();

  const { data: learningDirections = [] } = useLearningDirections();
  const { data: allSkills = [], isLoading: allSkillsLoading } = useSkills();
  const { data: connections = [] } = useAcceptedConnections();

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

  const { mutateAsync: addInterest, isPending: isAddingInterest } =
    useAddMyInterest();
  const { mutateAsync: removeInterest, isPending: isRemovingInterest } =
    useRemoveMyInterest();

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

  const createProgress = useCreateProgress();
  const updateProgress = useUpdateProgress();
  const deleteProgress = useDeleteProgress();

  const createContent = useCreateEducationalContent();
  const updateContent = useUpdateEducationalContent();
  const deleteContent = useDeleteEducationalContent();

  const createSession = useCreateLearningSession();
  const updateSession = useUpdateLearningSession();
  const rateSession = useRateLearningSession();

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
  const [experienceForm, setExperienceForm] = useState<ExperienceFormState>({
    title: "",
    description: "",
  });

  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [editingProgress, setEditingProgress] =
    useState<ProgressResponse | null>(null);
  const [progressForm, setProgressForm] = useState<ProgressFormState>({
    learningDirectionId: "",
    level: "",
    startedAt: "",
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

  // --- Sessions state ---
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [editingSession, setEditingSession] =
    useState<LearningSessionResponse | null>(null);
  const [sessionForm, setSessionForm] = useState<SessionFormState>({
    connectionId: "",
    title: "",
    description: "",
    scheduledAt: "",
    meetingUrl: "",
    status: "Scheduled",
  });
  const [ratingSession, setRatingSession] =
    useState<LearningSessionResponse | null>(null);

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

  const filteredSkills = useMemo(() => {
    const query = skillSearch.trim().toLowerCase();
    if (!query) return allSkills;
    return allSkills.filter((skill) =>
      skill.name?.toLowerCase().includes(query)
    );
  }, [allSkills, skillSearch]);

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
    try {
      await addInterest(interestId);
    } catch {
      // Interests may 404 until backend is seeded
    }
  };

  const handleRemoveInterest = async (interestId: string) => {
    try {
      await removeInterest(interestId);
    } catch {
      // ignore
    }
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
    const confirmed = window.confirm(t("profile.experiences.deleteConfirm"));
    if (!confirmed) return;
    await deleteExperience.mutateAsync(id);
  };

  const openCreateProgress = () => {
    setEditingProgress(null);
    setProgressForm({ learningDirectionId: "", level: "", startedAt: "" });
    setIsProgressModalOpen(true);
  };

  const openEditProgress = (item: ProgressResponse) => {
    setEditingProgress(item);
    setProgressForm({
      learningDirectionId: item.learningDirectionId,
      level: item.level ?? "",
      startedAt: item.startedAt ? item.startedAt.slice(0, 10) : "",
    });
    setIsProgressModalOpen(true);
  };

  const handleProgressSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingProgress) {
      await updateProgress.mutateAsync({
        id: editingProgress.id,
        payload: {
          level: progressForm.level || null,
          startedAt: progressForm.startedAt || undefined,
        },
      });
    } else {
      await createProgress.mutateAsync({
        learningDirectionId: progressForm.learningDirectionId,
        level: progressForm.level || null,
        startedAt: progressForm.startedAt,
      });
    }
    setIsProgressModalOpen(false);
    setEditingProgress(null);
  };

  const handleDeleteProgress = async (id: string) => {
    const confirmed = window.confirm(
      t("profile.progress.deleteConfirm", {
        defaultValue: "Delete this progress record?",
      })
    );
    if (!confirmed) return;
    await deleteProgress.mutateAsync(id);
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
    const confirmed = window.confirm(t("profile.content.deleteConfirm"));
    if (!confirmed) return;
    await deleteContent.mutateAsync(id);
  };

  const openScheduleSession = () => {
    setEditingSession(null);
    setSessionForm({
      connectionId: "",
      title: "",
      description: "",
      scheduledAt: "",
      meetingUrl: "",
      status: "Scheduled",
    });
    setIsSessionModalOpen(true);
  };

  const openEditSession = (session: LearningSessionResponse) => {
    setEditingSession(session);
    setSessionForm({
      connectionId: session.connectionId,
      title: session.title ?? "",
      description: session.description ?? "",
      scheduledAt: toDatetimeLocal(session.scheduledAt),
      meetingUrl: session.meetingUrl ?? "",
      status: session.status ?? "Scheduled",
    });
    setIsSessionModalOpen(true);
  };

  const handleSessionSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const scheduledAtIso = sessionForm.scheduledAt
      ? new Date(sessionForm.scheduledAt).toISOString()
      : new Date().toISOString();

    if (editingSession) {
      await updateSession.mutateAsync({
        id: editingSession.id,
        payload: {
          title: sessionForm.title.trim() || null,
          description: sessionForm.description.trim() || null,
          scheduledAt: scheduledAtIso,
          meetingUrl: sessionForm.meetingUrl.trim() || null,
          status: sessionForm.status || null,
        },
      });
    } else {
      if (!sessionForm.connectionId) return;
      await createSession.mutateAsync({
        connectionId: sessionForm.connectionId,
        title: sessionForm.title.trim() || null,
        description: sessionForm.description.trim() || null,
        scheduledAt: scheduledAtIso,
        meetingUrl: sessionForm.meetingUrl.trim() || null,
      });
    }

    setIsSessionModalOpen(false);
    setEditingSession(null);
  };

  const handleCompleteSession = async (session: LearningSessionResponse) => {
    await updateSession.mutateAsync({
      id: session.id,
      payload: { status: "Completed" },
    });
  };

  const handleRateSubmit = async (payload: {
    score: number;
    review: string | null;
  }) => {
    if (!ratingSession) return;
    await rateSession.mutateAsync({
      sessionId: ratingSession.id,
      payload,
    });
    setRatingSession(null);
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
          <h1 className="text-lg font-bold">{t("profile.error.title")}</h1>
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
            <ProfileAbout bio={profile.bio} />
          </div>
        </section>

        <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "skills" && (
          <>
            <ProfileSkillsSection
              profileSkills={profileSkills}
              profileSkillsLoading={profileSkillsLoading}
              profileInterests={profileInterests}
              profileInterestsLoading={profileInterestsLoading}
              onEditSkills={openEditSkills}
            />
            <SkillVerificationSection />
          </>
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
              onAdd={openCreateProgress}
              onEdit={openEditProgress}
              onDelete={handleDeleteProgress}
              isDeleting={deleteProgress.isPending}
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
              onSchedule={openScheduleSession}
              onEdit={openEditSession}
              onComplete={handleCompleteSession}
              onRate={setRatingSession}
              isUpdating={updateSession.isPending}
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
          interestsLoading={profileInterestsLoading || allSkillsLoading}
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

      {isProgressModalOpen && (
        <ProgressModal
          mode={editingProgress ? "edit" : "create"}
          form={progressForm}
          setForm={setProgressForm}
          skills={learningDirections}
          isSaving={createProgress.isPending || updateProgress.isPending}
          onClose={() => {
            setIsProgressModalOpen(false);
            setEditingProgress(null);
          }}
          onSubmit={handleProgressSubmit}
        />
      )}

      {isContentModalOpen && (
        <ContentModal
          mode={editingContent ? "edit" : "create"}
          form={contentForm}
          setForm={setContentForm}
          isSaving={createContent.isPending || updateContent.isPending}
          onClose={() => {
            setIsContentModalOpen(false);
            setEditingContent(null);
          }}
          onSubmit={handleContentSubmit}
        />
      )}

      {isSessionModalOpen && (
        <SessionModal
          mode={editingSession ? "edit" : "create"}
          form={sessionForm}
          setForm={setSessionForm}
          connections={connections}
          myUserId={myUserId}
          isSaving={createSession.isPending || updateSession.isPending}
          onClose={() => {
            setIsSessionModalOpen(false);
            setEditingSession(null);
          }}
          onSubmit={handleSessionSubmit}
        />
      )}

      {ratingSession && (
        <RateSessionModal
          sessionTitle={
            ratingSession.title || t("profile.sessions.untitled")
          }
          isSaving={rateSession.isPending}
          onClose={() => setRatingSession(null)}
          onSubmit={handleRateSubmit}
        />
      )}
    </div>
  );
}