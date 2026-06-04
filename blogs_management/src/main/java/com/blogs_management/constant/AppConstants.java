package com.blogs_management.constant;

public final class AppConstants {

    private AppConstants() {
    }

    public static final String STATUS_ACTIVE = "ACTIVE";

    public static final String MESSAGE_KEY_AUTH_LOGIN_INVALID_EMAIL = "auth.login.invalid_email";
    public static final String MESSAGE_KEY_AUTH_LOGIN_ACCOUNT_DISABLED = "auth.login.account_disabled";
    public static final String MESSAGE_KEY_AUTH_LOGIN_INCORRECT_PASSWORD = "auth.login.incorrect_password";
    public static final String MESSAGE_KEY_AUTH_REFRESH_TOKEN_NULL = "auth.refresh.token_null";
    public static final String MESSAGE_KEY_AUTH_REFRESH_INVALID_TOKEN = "auth.refresh.invalid_token";
    public static final String MESSAGE_KEY_AUTH_REFRESH_EXPIRED_TOKEN = "auth.refresh.expired_token";
    public static final String MESSAGE_KEY_AUTH_REFRESH_REUSE_DETECTED = "auth.refresh.reuse_detected";
    public static final String MESSAGE_KEY_AUTH_LOGOUT_TOKEN_NULL = "auth.logout.token_null";
    public static final String MESSAGE_KEY_AUTH_LOGOUT_INVALID_TOKEN = "auth.logout.invalid_token";

    public static final String MESSAGE_KEY_BLOG_NOT_FOUND_SLUG = "blog.not_found.slug";
    public static final String MESSAGE_KEY_BLOG_NOT_FOUND_ID = "blog.not_found.id";

    public static final String SUPABASE_STORAGE_OBJECT_PATH = "/storage/v1/object/";
    public static final String PATH_SEPARATOR = "/";
    public static final String MEDIA_TYPE_APPLICATION_OCTET_STREAM = "application/octet-stream";
    public static final String HEADER_X_UPSERT = "x-upsert";
    public static final String HEADER_VALUE_FALSE = "false";
    public static final String MESSAGE_UPLOAD_FAILED_PREFIX = "Upload failed: ";
    public static final String MESSAGE_SUPABASE_UPLOAD_FAILED_PREFIX = "Supabase upload failed: ";
}
