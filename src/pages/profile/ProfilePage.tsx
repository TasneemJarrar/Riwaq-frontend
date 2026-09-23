import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";
import { useMyProfile, useUpdateMyProfile } from "../../hooks/useProfile";
import { useProfileSkills } from "../../hooks/useProfileSkills";
import {
  useLearningDirections,
  useLearningDirection,
  useUpdateLearningDirection,
} from "../../hooks/useLearningDirections";
import ProfileHeader from "./components/ProfileHeader";
import ProfileStats from "./components/ProfileStats";
import ProfileAbout from "./components/ProfileAbout";
import ProfileTabs, { type ProfileTab } from "./components/ProfileTabs";
import ProfileSkillsSection from "./components/ProfileSkillsSection";
import PlaceholderSection from "./components/PlaceholderSection";
import EditProfileModal from "./components/EditProfileModal";
import EditSkillsModal from "./components/EditSkillsModal";

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

  const {
    data: learningDirections = [],
    isLoading: learningDirectionsLoading,
  } = useLearningDirections();

  const {
    profileSkills,
    isLoading: profileSkillsLoading,
    addSkill,
    removeSkill,
    isAdding,
    isRemoving,
  } = useProfileSkills();

  const {
    data: learningDirection,
    isLoading: learningDirectionLoading,
  } = useLearningDirection(profile?.learningDirectionId ?? null);
  const {
    mutateAsync: updateLearningDirection,
    isPending: isUpdatingLearningDirection,
  } = useUpdateLearningDirection();

  const [activeTab, setActiveTab] = useState<ProfileTab>("skills");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditSkillsOpen, setIsEditSkillsOpen] = useState(false);
  const [skillSearch, setSkillSearch] = useState("");
  const [selectedLearningDirectionId, setSelectedLearningDirectionId] =
    useState("");

  const [form, setForm] = useState<ProfileFormState>({
    firstName: "",
    lastName: "",
    bio: "",
    university: "",
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

  const currentLearningDirection = useMemo(
    () =>
      learningDirections.find(
        (direction) => direction.id === profile?.learningDirectionId
      ),
    [learningDirections, profile?.learningDirectionId]
  );

  const availableSkills = useMemo(
    () => learningDirection?.skills ?? [],
    [learningDirection]
  );

  const profileSkillIds = useMemo(
    () => new Set(profileSkills.map((skill) => skill.id)),
    [profileSkills]
  );

  const filteredSkills = useMemo(() => {
    const query = skillSearch.trim().toLowerCase();
    if (!query) return availableSkills;
    return availableSkills.filter((skill) =>
      skill.name?.toLowerCase().includes(query)
    );
  }, [availableSkills, skillSearch]);

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
    setSelectedLearningDirectionId(profile?.learningDirectionId ?? "");
    setSkillSearch("");
    setIsEditSkillsOpen(true);
  };

  const handleProfileSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await updateProfile(form);
    setIsEditProfileOpen(false);
  };

  const handleLearningDirectionChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const directionId = event.target.value;
    setSelectedLearningDirectionId(directionId);
    if (!directionId) return;
    await updateLearningDirection(directionId);
  };

  const handleAddSkill = async (skillId: string) => {
    if (profileSkillIds.has(skillId)) return;
    await addSkill(skillId);
  };

  const handleRemoveSkill = async (skillId: string) => {
    await removeSkill(skillId);
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

            <ProfileAbout
              bio={profile.bio}
              onEdit={openEditProfile}
            />
          </div>
        </section>

        <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "skills" && (
          <ProfileSkillsSection
            profileSkills={profileSkills}
            profileSkillsLoading={profileSkillsLoading}
            currentLearningDirection={currentLearningDirection}
            onEditSkills={openEditSkills}
          />
        )}

        {activeTab === "reviews" && (
          <PlaceholderSection
            title={t("profile.tabs.reviews")}
            description={t("profile.comingSoon.reviews")}
          />
        )}

        {activeTab === "content" && (
          <PlaceholderSection
            title={t("profile.tabs.content")}
            description={t("profile.comingSoon.content")}
          />
        )}

        {activeTab === "history" && (
          <PlaceholderSection
            title={t("profile.tabs.history")}
            description={t("profile.comingSoon.history")}
          />
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
          selectedLearningDirectionId={selectedLearningDirectionId}
          learningDirections={learningDirections}
          learningDirectionsLoading={learningDirectionsLoading}
          isUpdatingLearningDirection={isUpdatingLearningDirection}
          onLearningDirectionChange={handleLearningDirectionChange}
          skillSearch={skillSearch}
          onSkillSearchChange={setSkillSearch}
          profileSkills={profileSkills}
          filteredSkills={filteredSkills}
          profileSkillIds={profileSkillIds}
          learningDirectionLoading={learningDirectionLoading}
          isAdding={isAdding}
          isRemoving={isRemoving}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
          onClose={() => setIsEditSkillsOpen(false)}
        />
      )}
    </div>
  );
}