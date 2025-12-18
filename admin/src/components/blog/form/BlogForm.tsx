import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Card } from "react-bootstrap";
import axios from "axios";
import type { BlogRequest, BlogResponse } from "../../../types/Blog";
import { toast } from "react-toastify";
import ImagePickerModal from "../ImagePickerModal";
import type { ImageResponse } from "../../../types/Image";
import BlogActionsSection from "./BlogActionSection";
import BlogImageSection from "./BlogImageSection";
import BlogMetaSection from "./BlogMetaSection";
import BlogTagsSection from "./BlogTagsSection";
import BlogContentSection from "./BlogContentSection";
type BlogFormProps = {
  mode: "create" | "edit";
  blog?: BlogResponse;
};

type PickerMode = "cover" | "editor";

export default function BlogForm(props: BlogFormProps) {
  const { mode, blog } = props;
  const [showUploadImage, setShowUploadImage] = useState<boolean>(false);
  const [coverSelectedImage, setCoverSelectedImage] = useState<ImageResponse>();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(blog?.title ?? "");
  const [slug, setSlug] = useState<string>(blog?.slug ?? "");
  const [excerpt, setExcerpt] = useState<string>(blog?.excerpt ?? "");
  const [author, setAuthor] = useState<string>(blog?.author ?? "");
  const [content, setContent] = useState<string>(blog?.content ?? "");
  const [tags, setTags] = useState<string[]>(
    blog?.tags.split(",").map((t) => t.trim()) ?? []
  );
  const [tagInput, setTagInput] = useState<string>("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    blog?.coverImageUrl ?? null
  );
  const [coverImagePath, setCoverImagePath] = useState<string>(blog?.coverImagePath ?? "");
  const [pickerMode, setPickerMode ] = useState<PickerMode>("cover");
  const [pendingInsertCb, setPendingInsertCb] = useState<((url: string) => void) | null> (null);
  const [pickerSelectedImage, setPickerSelectedImage] = useState<ImageResponse | undefined>();
  
  // *************--------Handle slug logic------------************//
  function slugtify(title: string) {
    return title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  function handleTitleBlur() {
    if (title.trim()) {
      setSlug(slugtify(title));
    } else {
      setSlug("");
    }
  }

  // *************--------Handle Image logic------------************//

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverImageFile(file);
    setCoverSelectedImage(undefined);
    const objectUrl = URL.createObjectURL(file);
    setCoverImagePreview(objectUrl);

    const formData = new FormData();
    formData.append("file", file);
    const uploadImage = await axios.post("/api/uploads/blog-cover", formData);
    setCoverImagePath(uploadImage.data.path);
  }
  // prevent leak data
  useEffect(() => {
    return () => {
      if (coverImagePreview) {
        URL.revokeObjectURL(coverImagePreview);
      }
    };
  }, [coverImagePreview]);

  // function handleApplyImage(img: ImageResponse) {
  //   setCoverImagePreview(img.url);
  //   setCoverImagePath(img.path);
  //   setCoverImageFile(null);   
  // }

  function handleClearImage() {
    if (coverImageFile) {
      setCoverImageFile(null);
    }
    if (coverSelectedImage) {
      setCoverSelectedImage(undefined);
    }
    setCoverImagePreview("");
    setCoverImagePath("");
  }

  function handlePickerApply (img: ImageResponse) {
    if (pickerMode === "cover") {
      setCoverImagePreview(img.url);
      setCoverImagePath(img.path);
      setCoverImageFile(null);  
      setCoverSelectedImage(img);
    } else {
      pendingInsertCb?.(img.url);
      setPendingInsertCb(null);
    }
  }

  function openCoverPicker() {
    setPickerMode("cover");
    setShowUploadImage(true);
  }
 
  function onOpenEditorImagePicker(cb: (url: string) => void) {
    setPickerMode("editor");
    setPendingInsertCb(() => cb);
    setPickerSelectedImage(undefined);
    setShowUploadImage(true);
  }
  // *************--------Handle tags logic------------************//
  function addTag() {
    const tag = tagInput;
    if (!tag) return;
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags(tags.filter((x) => x !== tag));
  }

  // *************--------Handle save button logic------------************//
  const saveBlog = async (published: boolean) => {
    if (!title.trim() || !content.trim() || !author.trim()) {
      toast.error("Title,content or author can't be empty");
      return;
    }
    if (!coverImageFile && !coverSelectedImage && !coverImagePath) {
      toast.error("Cover image can't be empty");
      return;
    }

    const baseSlug = slugtify(title);
    const randomSuffix = Date.now().toString(36);
    const doneSlug = `${baseSlug}-${randomSuffix}`;

    const blogReq: BlogRequest = {
      title: title.trim(),
      author: author.trim(),
      excerpt: excerpt.trim(),
      tags: tags.join(","),
      slug: doneSlug,
      coverImagePath: coverImagePath,
      content: content,
      publish: published,
    };
    if (mode === "create") {
      try {
        await axios.post("/api/blogs", blogReq);
        if (published) {
          toast.success("Create blog and publish success 🎉");
        } else {
          toast.warning("You've saved blog as draft 🎉");
        }
        setTimeout(() => {
          navigate("/");
        }, 800);
      } catch (error) {
        console.error(error);
        toast.error("Failed to create blog 😢");
      }
    } else {
      try {
        await axios.put(`/api/blogs/${blog?.id}`, blogReq);
        if (published) {
          toast.success("Update blog and publish success 🎉");
        } else {
          toast.warning("You've saved blog as draft 🎉");
        }
        setTimeout(() => {
          navigate("/");
        }, 800);
      } catch (error) {
        console.error(error);
        toast.error("Failed to update blog 😢");
      }
    }
  };

  const handleSavePublish = () => {
    saveBlog(true);
  };

  const handleSaveDraft = () => {
    saveBlog(false);
  };

  return (
    <Card className="p-4">
      <h4 className="mb-3">
        {mode === "create" ? "Create New Blog" : "Edit Blog"}
      </h4>

      <Form className="d-flex flex-column gap-3">
        <BlogMetaSection
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          slug={slug}
          onTitleBlur={handleTitleBlur}
        />
        <BlogImageSection
          selectedImage={coverSelectedImage}
          coverImageFile={coverImageFile}
          coverImagePreview={coverImagePreview}
          openCoverPicker={openCoverPicker}
          handleImageChange={handleImageChange}
          handleClearImage={handleClearImage}
        />
        <BlogTagsSection
          tagInput={tagInput}
          tags={tags}
          addTag={addTag}
          setTagInput={setTagInput}
          removeTag={removeTag}
        />

        <BlogContentSection
          onOpenEditorImagePicker={onOpenEditorImagePicker}
          excerpt={excerpt}
          setExcerpt={setExcerpt}
          content={content}
          setContent={setContent}
        />

        <BlogActionsSection
          mode={mode}
          onSaveDraft={handleSaveDraft}
          onSavePublish={handleSavePublish}
        />
      </Form>
      <ImagePickerModal
        showUploadImage={showUploadImage}
        onClose={() => {
          setShowUploadImage(false);
          setPendingInsertCb(null);
          setPickerSelectedImage(undefined);
        }}
        onApplyImage={handlePickerApply}
        selectedImage={pickerSelectedImage}
        setSelectedImage={setPickerSelectedImage}
        title={pickerMode==="cover" ? "Choose cover image" : "Insert image"}
        subTitle={pickerMode==="cover" ? "Choose image for blog cover" : "Choose image for blog content"}
      />
    </Card>
  );
}
